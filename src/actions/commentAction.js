/**
 * @flow
 */
import _ from 'lodash'
import { createAction } from 'redux-act'
import { getCommentList } from "../api/api"
import { RefreshState } from "react-native-refresh-list-view"

export const currentComment = createAction('current comment Data', arg => arg, arg => 'currentComment')
export const commentRefreshState = createAction('current comment RefreshState', arg => arg, arg => 'commentRefreshState')

export const getCurrentComment = ({
                                    jid,
                                    page = 1,
                                  }: {
  jid: string,
  page?: number,
  callback?: () => void,
}) => async (store) => {
  try {
    const oldCurrentComment = _.get(store, 'comment.currentComment')
    const result = await getCommentList({
      page,
      jid,
    })

    if (_.get(result, 'comments', []).length === 0) {
      return [commentRefreshState(RefreshState.NoMoreData)]
    }
    const mergeData = {
      ...result,
      comments: [
        ..._.get(oldCurrentComment, 'comments', []),
        ..._.get(result, 'comments', [])
      ],
      page,
      jid,
    }
    return [currentComment({
      ...mergeData,
    }), commentRefreshState(RefreshState.Idle)]
  } catch (e) {
    return [commentRefreshState(RefreshState.Failure)]
  }
}
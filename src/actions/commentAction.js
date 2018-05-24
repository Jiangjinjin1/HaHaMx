/**
 * @flow
 */
import _ from 'lodash'
import { createAction } from 'redux-act'
import { getCommentList } from "../api/api";
import { RefreshState } from "react-native-refresh-list-view";

export const currentComment = createAction('current comment Data')

export const getCurrentComment = ({
                                    jid,
                                    page = 1,
                                    callback,
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
      callback && callback(RefreshState.NoMoreData)
      return []
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
    callback && callback(RefreshState.Idle)
    return currentComment({
      ...mergeData,
    })
  } catch (e) {
    callback && callback(RefreshState.Failure)
    return []
  }
}
/**
 * @flow
 */
import _ from 'lodash'
import { createAction } from 'redux-act'
import { getCommentList } from "../api/api";

export const currentComment = createAction('current comment Data')

export const getCurrentComment = ({
                                    jid,
                                    page = 1,
                                    comment_num = 0,
                                    preResult = {},
                                  }: {
  jid: string,
  page?: number,
  comment_num?: number,
  preResult?: Object,
}) => async () => {
  const result = await getCommentList({
    page: page++,
    jid,
  })
  const mergeData = {
    ...preResult,
    ...result,
    comments: [
      ..._.get(preResult, 'comments', []),
      ..._.get(result, 'comments', [])
    ]
  }
  if(!_.isEmpty(result) && _.get(result, 'comments', []).length === 0){
    return currentComment({
      ...mergeData,
    })
  }
  if ( comment_num > 10 ) {
    return await getCurrentComment({ page, preResult: mergeData, comment_num, jid })
  }
}
import {actions, follow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodes} from "../api/api";

jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test("follow", async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
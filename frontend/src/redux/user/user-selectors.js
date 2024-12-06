export const getInLoggedIn = (state) => state.user.isLoggedIn;
export const getVerify = (state) => state?.user?.verify;
export const getToken = (state) => state?.user?.token;
export const getIsRefresh = (state) => state.user.isRefreshing;
export const getName = (state) => state?.user?.name;
export const getEmail = (state) => state?.user?.email;
export const getNickName = (state) => state?.user?.nickName;

export const getVerificationToken = (state) => state?.user?.verificationToken;
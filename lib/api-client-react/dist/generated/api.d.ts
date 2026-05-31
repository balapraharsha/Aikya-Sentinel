import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Account, AccountInput, AccountUpdate, Alert, AlertInput, AlertStats, AlertUpdate, AuthTokens, BehaviourAnalysisResult, Case, CaseInput, CaseUpdate, CollusionInput, CollusionResult, CopilotChatInput, CopilotChatResult, DashboardOverview, DigitalTwinResult, Employee, EmployeeInput, EmployeeUpdate, EntityAnalysisInput, FraudIntentResult, FundFlowInput, FundFlowResult, GetRiskTrendsParams, GetTopRiskyEntitiesParams, GetTransactionVolumeParams, HealthStatus, InsiderThreatResult, LearningFeedbackInput, ListAlertsParams, ListTransactionsParams, LoginInput, MessageResponse, PatternMatchInput, PatternMatchResult, PersonalityResult, PrioritiseAlertsInput, PrioritisedAlert, RefreshTokenInput, ReportInput, ReportResult, RiskRadarResult, RiskScore, RiskTrendPoint, RiskyEntity, ShellMuleResult, SimulationInput, SimulationResult, TaxRiskResult, TimelineResult, Transaction, TransactionInput, TransactionVolumePoint, TrustScoreResult, User, UserInput, UserRegisterInput, UserUpdate, XAIInput, XAIResult } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getRegisterUrl: () => string;
/**
 * @summary Register a new user
 */
export declare const register: (userRegisterInput: UserRegisterInput, options?: RequestInit) => Promise<AuthTokens>;
export declare const getRegisterMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
        data: BodyType<UserRegisterInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
    data: BodyType<UserRegisterInput>;
}, TContext>;
export type RegisterMutationResult = NonNullable<Awaited<ReturnType<typeof register>>>;
export type RegisterMutationBody = BodyType<UserRegisterInput>;
export type RegisterMutationError = ErrorType<void>;
/**
* @summary Register a new user
*/
export declare const useRegister: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
        data: BodyType<UserRegisterInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof register>>, TError, {
    data: BodyType<UserRegisterInput>;
}, TContext>;
export declare const getLoginUrl: () => string;
/**
 * @summary Login
 */
export declare const login: (loginInput: LoginInput, options?: RequestInit) => Promise<AuthTokens>;
export declare const getLoginMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: BodyType<LoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
    data: BodyType<LoginInput>;
}, TContext>;
export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>;
export type LoginMutationBody = BodyType<LoginInput>;
export type LoginMutationError = ErrorType<void>;
/**
* @summary Login
*/
export declare const useLogin: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: BodyType<LoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof login>>, TError, {
    data: BodyType<LoginInput>;
}, TContext>;
export declare const getLogoutUrl: () => string;
/**
 * @summary Logout
 */
export declare const logout: (options?: RequestInit) => Promise<MessageResponse>;
export declare const getLogoutMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
export type LogoutMutationResult = NonNullable<Awaited<ReturnType<typeof logout>>>;
export type LogoutMutationError = ErrorType<unknown>;
/**
* @summary Logout
*/
export declare const useLogout: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
export declare const getRefreshTokenUrl: () => string;
/**
 * @summary Refresh access token
 */
export declare const refreshToken: (refreshTokenInput: RefreshTokenInput, options?: RequestInit) => Promise<AuthTokens>;
export declare const getRefreshTokenMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError, {
        data: BodyType<RefreshTokenInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError, {
    data: BodyType<RefreshTokenInput>;
}, TContext>;
export type RefreshTokenMutationResult = NonNullable<Awaited<ReturnType<typeof refreshToken>>>;
export type RefreshTokenMutationBody = BodyType<RefreshTokenInput>;
export type RefreshTokenMutationError = ErrorType<unknown>;
/**
* @summary Refresh access token
*/
export declare const useRefreshToken: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError, {
        data: BodyType<RefreshTokenInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof refreshToken>>, TError, {
    data: BodyType<RefreshTokenInput>;
}, TContext>;
export declare const getGetMeUrl: () => string;
/**
 * @summary Get current user
 */
export declare const getMe: (options?: RequestInit) => Promise<User>;
export declare const getGetMeQueryKey: () => readonly ["/api/auth/me"];
export declare const getGetMeQueryOptions: <TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>;
export type GetMeQueryError = ErrorType<unknown>;
/**
 * @summary Get current user
 */
export declare function useGetMe<TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListUsersUrl: () => string;
/**
 * @summary List users
 */
export declare const listUsers: (options?: RequestInit) => Promise<User[]>;
export declare const getListUsersQueryKey: () => readonly ["/api/users"];
export declare const getListUsersQueryOptions: <TData = Awaited<ReturnType<typeof listUsers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListUsersQueryResult = NonNullable<Awaited<ReturnType<typeof listUsers>>>;
export type ListUsersQueryError = ErrorType<unknown>;
/**
 * @summary List users
 */
export declare function useListUsers<TData = Awaited<ReturnType<typeof listUsers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateUserUrl: () => string;
/**
 * @summary Create user
 */
export declare const createUser: (userInput: UserInput, options?: RequestInit) => Promise<User>;
export declare const getCreateUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createUser>>, TError, {
        data: BodyType<UserInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createUser>>, TError, {
    data: BodyType<UserInput>;
}, TContext>;
export type CreateUserMutationResult = NonNullable<Awaited<ReturnType<typeof createUser>>>;
export type CreateUserMutationBody = BodyType<UserInput>;
export type CreateUserMutationError = ErrorType<unknown>;
/**
* @summary Create user
*/
export declare const useCreateUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createUser>>, TError, {
        data: BodyType<UserInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createUser>>, TError, {
    data: BodyType<UserInput>;
}, TContext>;
export declare const getGetUserUrl: (id: number) => string;
/**
 * @summary Get user
 */
export declare const getUser: (id: number, options?: RequestInit) => Promise<User>;
export declare const getGetUserQueryKey: (id: number) => readonly [`/api/users/${number}`];
export declare const getGetUserQueryOptions: <TData = Awaited<ReturnType<typeof getUser>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetUserQueryResult = NonNullable<Awaited<ReturnType<typeof getUser>>>;
export type GetUserQueryError = ErrorType<void>;
/**
 * @summary Get user
 */
export declare function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateUserUrl: (id: number) => string;
/**
 * @summary Update user
 */
export declare const updateUser: (id: number, userUpdate: UserUpdate, options?: RequestInit) => Promise<User>;
export declare const getUpdateUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateUser>>, TError, {
        id: number;
        data: BodyType<UserUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateUser>>, TError, {
    id: number;
    data: BodyType<UserUpdate>;
}, TContext>;
export type UpdateUserMutationResult = NonNullable<Awaited<ReturnType<typeof updateUser>>>;
export type UpdateUserMutationBody = BodyType<UserUpdate>;
export type UpdateUserMutationError = ErrorType<unknown>;
/**
* @summary Update user
*/
export declare const useUpdateUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateUser>>, TError, {
        id: number;
        data: BodyType<UserUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateUser>>, TError, {
    id: number;
    data: BodyType<UserUpdate>;
}, TContext>;
export declare const getDeleteUserUrl: (id: number) => string;
/**
 * @summary Delete user
 */
export declare const deleteUser: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError, {
    id: number;
}, TContext>;
export type DeleteUserMutationResult = NonNullable<Awaited<ReturnType<typeof deleteUser>>>;
export type DeleteUserMutationError = ErrorType<unknown>;
/**
* @summary Delete user
*/
export declare const useDeleteUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteUser>>, TError, {
    id: number;
}, TContext>;
export declare const getListEmployeesUrl: () => string;
/**
 * @summary List employees
 */
export declare const listEmployees: (options?: RequestInit) => Promise<Employee[]>;
export declare const getListEmployeesQueryKey: () => readonly ["/api/employees"];
export declare const getListEmployeesQueryOptions: <TData = Awaited<ReturnType<typeof listEmployees>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListEmployeesQueryResult = NonNullable<Awaited<ReturnType<typeof listEmployees>>>;
export type ListEmployeesQueryError = ErrorType<unknown>;
/**
 * @summary List employees
 */
export declare function useListEmployees<TData = Awaited<ReturnType<typeof listEmployees>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateEmployeeUrl: () => string;
/**
 * @summary Create employee
 */
export declare const createEmployee: (employeeInput: EmployeeInput, options?: RequestInit) => Promise<Employee>;
export declare const getCreateEmployeeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError, {
        data: BodyType<EmployeeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError, {
    data: BodyType<EmployeeInput>;
}, TContext>;
export type CreateEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof createEmployee>>>;
export type CreateEmployeeMutationBody = BodyType<EmployeeInput>;
export type CreateEmployeeMutationError = ErrorType<unknown>;
/**
* @summary Create employee
*/
export declare const useCreateEmployee: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError, {
        data: BodyType<EmployeeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createEmployee>>, TError, {
    data: BodyType<EmployeeInput>;
}, TContext>;
export declare const getGetEmployeeUrl: (id: number) => string;
/**
 * @summary Get employee
 */
export declare const getEmployee: (id: number, options?: RequestInit) => Promise<Employee>;
export declare const getGetEmployeeQueryKey: (id: number) => readonly [`/api/employees/${number}`];
export declare const getGetEmployeeQueryOptions: <TData = Awaited<ReturnType<typeof getEmployee>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetEmployeeQueryResult = NonNullable<Awaited<ReturnType<typeof getEmployee>>>;
export type GetEmployeeQueryError = ErrorType<void>;
/**
 * @summary Get employee
 */
export declare function useGetEmployee<TData = Awaited<ReturnType<typeof getEmployee>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateEmployeeUrl: (id: number) => string;
/**
 * @summary Update employee
 */
export declare const updateEmployee: (id: number, employeeUpdate: EmployeeUpdate, options?: RequestInit) => Promise<Employee>;
export declare const getUpdateEmployeeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError, {
        id: number;
        data: BodyType<EmployeeUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError, {
    id: number;
    data: BodyType<EmployeeUpdate>;
}, TContext>;
export type UpdateEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof updateEmployee>>>;
export type UpdateEmployeeMutationBody = BodyType<EmployeeUpdate>;
export type UpdateEmployeeMutationError = ErrorType<unknown>;
/**
* @summary Update employee
*/
export declare const useUpdateEmployee: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError, {
        id: number;
        data: BodyType<EmployeeUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateEmployee>>, TError, {
    id: number;
    data: BodyType<EmployeeUpdate>;
}, TContext>;
export declare const getDeleteEmployeeUrl: (id: number) => string;
/**
 * @summary Delete employee
 */
export declare const deleteEmployee: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteEmployeeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteEmployee>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteEmployee>>, TError, {
    id: number;
}, TContext>;
export type DeleteEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof deleteEmployee>>>;
export type DeleteEmployeeMutationError = ErrorType<unknown>;
/**
* @summary Delete employee
*/
export declare const useDeleteEmployee: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteEmployee>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteEmployee>>, TError, {
    id: number;
}, TContext>;
export declare const getListAccountsUrl: () => string;
/**
 * @summary List accounts
 */
export declare const listAccounts: (options?: RequestInit) => Promise<Account[]>;
export declare const getListAccountsQueryKey: () => readonly ["/api/accounts"];
export declare const getListAccountsQueryOptions: <TData = Awaited<ReturnType<typeof listAccounts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAccounts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAccounts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAccountsQueryResult = NonNullable<Awaited<ReturnType<typeof listAccounts>>>;
export type ListAccountsQueryError = ErrorType<unknown>;
/**
 * @summary List accounts
 */
export declare function useListAccounts<TData = Awaited<ReturnType<typeof listAccounts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAccounts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateAccountUrl: () => string;
/**
 * @summary Create account
 */
export declare const createAccount: (accountInput: AccountInput, options?: RequestInit) => Promise<Account>;
export declare const getCreateAccountMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAccount>>, TError, {
        data: BodyType<AccountInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAccount>>, TError, {
    data: BodyType<AccountInput>;
}, TContext>;
export type CreateAccountMutationResult = NonNullable<Awaited<ReturnType<typeof createAccount>>>;
export type CreateAccountMutationBody = BodyType<AccountInput>;
export type CreateAccountMutationError = ErrorType<unknown>;
/**
* @summary Create account
*/
export declare const useCreateAccount: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAccount>>, TError, {
        data: BodyType<AccountInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAccount>>, TError, {
    data: BodyType<AccountInput>;
}, TContext>;
export declare const getGetAccountUrl: (id: number) => string;
/**
 * @summary Get account
 */
export declare const getAccount: (id: number, options?: RequestInit) => Promise<Account>;
export declare const getGetAccountQueryKey: (id: number) => readonly [`/api/accounts/${number}`];
export declare const getGetAccountQueryOptions: <TData = Awaited<ReturnType<typeof getAccount>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAccount>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAccount>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAccountQueryResult = NonNullable<Awaited<ReturnType<typeof getAccount>>>;
export type GetAccountQueryError = ErrorType<void>;
/**
 * @summary Get account
 */
export declare function useGetAccount<TData = Awaited<ReturnType<typeof getAccount>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAccount>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateAccountUrl: (id: number) => string;
/**
 * @summary Update account
 */
export declare const updateAccount: (id: number, accountUpdate: AccountUpdate, options?: RequestInit) => Promise<Account>;
export declare const getUpdateAccountMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAccount>>, TError, {
        id: number;
        data: BodyType<AccountUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateAccount>>, TError, {
    id: number;
    data: BodyType<AccountUpdate>;
}, TContext>;
export type UpdateAccountMutationResult = NonNullable<Awaited<ReturnType<typeof updateAccount>>>;
export type UpdateAccountMutationBody = BodyType<AccountUpdate>;
export type UpdateAccountMutationError = ErrorType<unknown>;
/**
* @summary Update account
*/
export declare const useUpdateAccount: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAccount>>, TError, {
        id: number;
        data: BodyType<AccountUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateAccount>>, TError, {
    id: number;
    data: BodyType<AccountUpdate>;
}, TContext>;
export declare const getDeleteAccountUrl: (id: number) => string;
/**
 * @summary Delete account
 */
export declare const deleteAccount: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteAccountMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAccount>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAccount>>, TError, {
    id: number;
}, TContext>;
export type DeleteAccountMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAccount>>>;
export type DeleteAccountMutationError = ErrorType<unknown>;
/**
* @summary Delete account
*/
export declare const useDeleteAccount: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAccount>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAccount>>, TError, {
    id: number;
}, TContext>;
export declare const getListTransactionsUrl: (params?: ListTransactionsParams) => string;
/**
 * @summary List transactions
 */
export declare const listTransactions: (params?: ListTransactionsParams, options?: RequestInit) => Promise<Transaction[]>;
export declare const getListTransactionsQueryKey: (params?: ListTransactionsParams) => readonly ["/api/transactions", ...ListTransactionsParams[]];
export declare const getListTransactionsQueryOptions: <TData = Awaited<ReturnType<typeof listTransactions>>, TError = ErrorType<unknown>>(params?: ListTransactionsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTransactions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listTransactions>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListTransactionsQueryResult = NonNullable<Awaited<ReturnType<typeof listTransactions>>>;
export type ListTransactionsQueryError = ErrorType<unknown>;
/**
 * @summary List transactions
 */
export declare function useListTransactions<TData = Awaited<ReturnType<typeof listTransactions>>, TError = ErrorType<unknown>>(params?: ListTransactionsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTransactions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateTransactionUrl: () => string;
/**
 * @summary Create transaction
 */
export declare const createTransaction: (transactionInput: TransactionInput, options?: RequestInit) => Promise<Transaction>;
export declare const getCreateTransactionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createTransaction>>, TError, {
        data: BodyType<TransactionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createTransaction>>, TError, {
    data: BodyType<TransactionInput>;
}, TContext>;
export type CreateTransactionMutationResult = NonNullable<Awaited<ReturnType<typeof createTransaction>>>;
export type CreateTransactionMutationBody = BodyType<TransactionInput>;
export type CreateTransactionMutationError = ErrorType<unknown>;
/**
* @summary Create transaction
*/
export declare const useCreateTransaction: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createTransaction>>, TError, {
        data: BodyType<TransactionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createTransaction>>, TError, {
    data: BodyType<TransactionInput>;
}, TContext>;
export declare const getGetTransactionUrl: (id: number) => string;
/**
 * @summary Get transaction
 */
export declare const getTransaction: (id: number, options?: RequestInit) => Promise<Transaction>;
export declare const getGetTransactionQueryKey: (id: number) => readonly [`/api/transactions/${number}`];
export declare const getGetTransactionQueryOptions: <TData = Awaited<ReturnType<typeof getTransaction>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransaction>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTransaction>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTransactionQueryResult = NonNullable<Awaited<ReturnType<typeof getTransaction>>>;
export type GetTransactionQueryError = ErrorType<void>;
/**
 * @summary Get transaction
 */
export declare function useGetTransaction<TData = Awaited<ReturnType<typeof getTransaction>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransaction>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListAlertsUrl: (params?: ListAlertsParams) => string;
/**
 * @summary List alerts
 */
export declare const listAlerts: (params?: ListAlertsParams, options?: RequestInit) => Promise<Alert[]>;
export declare const getListAlertsQueryKey: (params?: ListAlertsParams) => readonly ["/api/alerts", ...ListAlertsParams[]];
export declare const getListAlertsQueryOptions: <TData = Awaited<ReturnType<typeof listAlerts>>, TError = ErrorType<unknown>>(params?: ListAlertsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAlerts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAlerts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAlertsQueryResult = NonNullable<Awaited<ReturnType<typeof listAlerts>>>;
export type ListAlertsQueryError = ErrorType<unknown>;
/**
 * @summary List alerts
 */
export declare function useListAlerts<TData = Awaited<ReturnType<typeof listAlerts>>, TError = ErrorType<unknown>>(params?: ListAlertsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAlerts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateAlertUrl: () => string;
/**
 * @summary Create alert
 */
export declare const createAlert: (alertInput: AlertInput, options?: RequestInit) => Promise<Alert>;
export declare const getCreateAlertMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAlert>>, TError, {
        data: BodyType<AlertInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAlert>>, TError, {
    data: BodyType<AlertInput>;
}, TContext>;
export type CreateAlertMutationResult = NonNullable<Awaited<ReturnType<typeof createAlert>>>;
export type CreateAlertMutationBody = BodyType<AlertInput>;
export type CreateAlertMutationError = ErrorType<unknown>;
/**
* @summary Create alert
*/
export declare const useCreateAlert: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAlert>>, TError, {
        data: BodyType<AlertInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAlert>>, TError, {
    data: BodyType<AlertInput>;
}, TContext>;
export declare const getGetAlertUrl: (id: number) => string;
/**
 * @summary Get alert
 */
export declare const getAlert: (id: number, options?: RequestInit) => Promise<Alert>;
export declare const getGetAlertQueryKey: (id: number) => readonly [`/api/alerts/${number}`];
export declare const getGetAlertQueryOptions: <TData = Awaited<ReturnType<typeof getAlert>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAlert>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAlert>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAlertQueryResult = NonNullable<Awaited<ReturnType<typeof getAlert>>>;
export type GetAlertQueryError = ErrorType<void>;
/**
 * @summary Get alert
 */
export declare function useGetAlert<TData = Awaited<ReturnType<typeof getAlert>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAlert>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateAlertUrl: (id: number) => string;
/**
 * @summary Update alert status
 */
export declare const updateAlert: (id: number, alertUpdate: AlertUpdate, options?: RequestInit) => Promise<Alert>;
export declare const getUpdateAlertMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAlert>>, TError, {
        id: number;
        data: BodyType<AlertUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateAlert>>, TError, {
    id: number;
    data: BodyType<AlertUpdate>;
}, TContext>;
export type UpdateAlertMutationResult = NonNullable<Awaited<ReturnType<typeof updateAlert>>>;
export type UpdateAlertMutationBody = BodyType<AlertUpdate>;
export type UpdateAlertMutationError = ErrorType<unknown>;
/**
* @summary Update alert status
*/
export declare const useUpdateAlert: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAlert>>, TError, {
        id: number;
        data: BodyType<AlertUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateAlert>>, TError, {
    id: number;
    data: BodyType<AlertUpdate>;
}, TContext>;
export declare const getPrioritiseAlertsUrl: () => string;
/**
 * @summary M14 - Smart Alert Prioritisation
 */
export declare const prioritiseAlerts: (prioritiseAlertsInput: PrioritiseAlertsInput, options?: RequestInit) => Promise<PrioritisedAlert[]>;
export declare const getPrioritiseAlertsMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof prioritiseAlerts>>, TError, {
        data: BodyType<PrioritiseAlertsInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof prioritiseAlerts>>, TError, {
    data: BodyType<PrioritiseAlertsInput>;
}, TContext>;
export type PrioritiseAlertsMutationResult = NonNullable<Awaited<ReturnType<typeof prioritiseAlerts>>>;
export type PrioritiseAlertsMutationBody = BodyType<PrioritiseAlertsInput>;
export type PrioritiseAlertsMutationError = ErrorType<unknown>;
/**
* @summary M14 - Smart Alert Prioritisation
*/
export declare const usePrioritiseAlerts: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof prioritiseAlerts>>, TError, {
        data: BodyType<PrioritiseAlertsInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof prioritiseAlerts>>, TError, {
    data: BodyType<PrioritiseAlertsInput>;
}, TContext>;
export declare const getListCasesUrl: () => string;
/**
 * @summary List cases
 */
export declare const listCases: (options?: RequestInit) => Promise<Case[]>;
export declare const getListCasesQueryKey: () => readonly ["/api/cases"];
export declare const getListCasesQueryOptions: <TData = Awaited<ReturnType<typeof listCases>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCases>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCases>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCasesQueryResult = NonNullable<Awaited<ReturnType<typeof listCases>>>;
export type ListCasesQueryError = ErrorType<unknown>;
/**
 * @summary List cases
 */
export declare function useListCases<TData = Awaited<ReturnType<typeof listCases>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCases>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateCaseUrl: () => string;
/**
 * @summary Create case
 */
export declare const createCase: (caseInput: CaseInput, options?: RequestInit) => Promise<Case>;
export declare const getCreateCaseMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCase>>, TError, {
        data: BodyType<CaseInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCase>>, TError, {
    data: BodyType<CaseInput>;
}, TContext>;
export type CreateCaseMutationResult = NonNullable<Awaited<ReturnType<typeof createCase>>>;
export type CreateCaseMutationBody = BodyType<CaseInput>;
export type CreateCaseMutationError = ErrorType<unknown>;
/**
* @summary Create case
*/
export declare const useCreateCase: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCase>>, TError, {
        data: BodyType<CaseInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCase>>, TError, {
    data: BodyType<CaseInput>;
}, TContext>;
export declare const getGetCaseUrl: (id: number) => string;
/**
 * @summary Get case
 */
export declare const getCase: (id: number, options?: RequestInit) => Promise<Case>;
export declare const getGetCaseQueryKey: (id: number) => readonly [`/api/cases/${number}`];
export declare const getGetCaseQueryOptions: <TData = Awaited<ReturnType<typeof getCase>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCase>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCase>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCaseQueryResult = NonNullable<Awaited<ReturnType<typeof getCase>>>;
export type GetCaseQueryError = ErrorType<void>;
/**
 * @summary Get case
 */
export declare function useGetCase<TData = Awaited<ReturnType<typeof getCase>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCase>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateCaseUrl: (id: number) => string;
/**
 * @summary Update case
 */
export declare const updateCase: (id: number, caseUpdate: CaseUpdate, options?: RequestInit) => Promise<Case>;
export declare const getUpdateCaseMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCase>>, TError, {
        id: number;
        data: BodyType<CaseUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCase>>, TError, {
    id: number;
    data: BodyType<CaseUpdate>;
}, TContext>;
export type UpdateCaseMutationResult = NonNullable<Awaited<ReturnType<typeof updateCase>>>;
export type UpdateCaseMutationBody = BodyType<CaseUpdate>;
export type UpdateCaseMutationError = ErrorType<unknown>;
/**
* @summary Update case
*/
export declare const useUpdateCase: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCase>>, TError, {
        id: number;
        data: BodyType<CaseUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCase>>, TError, {
    id: number;
    data: BodyType<CaseUpdate>;
}, TContext>;
export declare const getAnalyseBehaviourUrl: () => string;
/**
 * @summary M1 - Behaviour DNA Engine
 */
export declare const analyseBehaviour: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<BehaviourAnalysisResult>;
export declare const getAnalyseBehaviourMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseBehaviour>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseBehaviour>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalyseBehaviourMutationResult = NonNullable<Awaited<ReturnType<typeof analyseBehaviour>>>;
export type AnalyseBehaviourMutationBody = BodyType<EntityAnalysisInput>;
export type AnalyseBehaviourMutationError = ErrorType<unknown>;
/**
* @summary M1 - Behaviour DNA Engine
*/
export declare const useAnalyseBehaviour: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseBehaviour>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseBehaviour>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getAnalyseInsiderThreatUrl: () => string;
/**
 * @summary M2 - Insider Threat Engine
 */
export declare const analyseInsiderThreat: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<InsiderThreatResult>;
export declare const getAnalyseInsiderThreatMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseInsiderThreat>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseInsiderThreat>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalyseInsiderThreatMutationResult = NonNullable<Awaited<ReturnType<typeof analyseInsiderThreat>>>;
export type AnalyseInsiderThreatMutationBody = BodyType<EntityAnalysisInput>;
export type AnalyseInsiderThreatMutationError = ErrorType<unknown>;
/**
* @summary M2 - Insider Threat Engine
*/
export declare const useAnalyseInsiderThreat: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseInsiderThreat>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseInsiderThreat>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getAnalyseFundFlowUrl: () => string;
/**
 * @summary M3 - Fund Flow Intelligence
 */
export declare const analyseFundFlow: (fundFlowInput: FundFlowInput, options?: RequestInit) => Promise<FundFlowResult>;
export declare const getAnalyseFundFlowMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseFundFlow>>, TError, {
        data: BodyType<FundFlowInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseFundFlow>>, TError, {
    data: BodyType<FundFlowInput>;
}, TContext>;
export type AnalyseFundFlowMutationResult = NonNullable<Awaited<ReturnType<typeof analyseFundFlow>>>;
export type AnalyseFundFlowMutationBody = BodyType<FundFlowInput>;
export type AnalyseFundFlowMutationError = ErrorType<unknown>;
/**
* @summary M3 - Fund Flow Intelligence
*/
export declare const useAnalyseFundFlow: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseFundFlow>>, TError, {
        data: BodyType<FundFlowInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseFundFlow>>, TError, {
    data: BodyType<FundFlowInput>;
}, TContext>;
export declare const getAnalyseTaxRiskUrl: () => string;
/**
 * @summary M4 - Lifestyle vs Income Risk
 */
export declare const analyseTaxRisk: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<TaxRiskResult>;
export declare const getAnalyseTaxRiskMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseTaxRisk>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseTaxRisk>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalyseTaxRiskMutationResult = NonNullable<Awaited<ReturnType<typeof analyseTaxRisk>>>;
export type AnalyseTaxRiskMutationBody = BodyType<EntityAnalysisInput>;
export type AnalyseTaxRiskMutationError = ErrorType<unknown>;
/**
* @summary M4 - Lifestyle vs Income Risk
*/
export declare const useAnalyseTaxRisk: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseTaxRisk>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseTaxRisk>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getAnalyseShellMuleUrl: () => string;
/**
 * @summary M5 - Shell/Mule Detection
 */
export declare const analyseShellMule: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<ShellMuleResult>;
export declare const getAnalyseShellMuleMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseShellMule>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseShellMule>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalyseShellMuleMutationResult = NonNullable<Awaited<ReturnType<typeof analyseShellMule>>>;
export type AnalyseShellMuleMutationBody = BodyType<EntityAnalysisInput>;
export type AnalyseShellMuleMutationError = ErrorType<unknown>;
/**
* @summary M5 - Shell/Mule Detection
*/
export declare const useAnalyseShellMule: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseShellMule>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseShellMule>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getAnalyseCollusionUrl: () => string;
/**
 * @summary M6 - Collusion Detection
 */
export declare const analyseCollusion: (collusionInput: CollusionInput, options?: RequestInit) => Promise<CollusionResult>;
export declare const getAnalyseCollusionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseCollusion>>, TError, {
        data: BodyType<CollusionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseCollusion>>, TError, {
    data: BodyType<CollusionInput>;
}, TContext>;
export type AnalyseCollusionMutationResult = NonNullable<Awaited<ReturnType<typeof analyseCollusion>>>;
export type AnalyseCollusionMutationBody = BodyType<CollusionInput>;
export type AnalyseCollusionMutationError = ErrorType<unknown>;
/**
* @summary M6 - Collusion Detection
*/
export declare const useAnalyseCollusion: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseCollusion>>, TError, {
        data: BodyType<CollusionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseCollusion>>, TError, {
    data: BodyType<CollusionInput>;
}, TContext>;
export declare const getAnalyseFraudIntentUrl: () => string;
/**
 * @summary M7 - Fraud Intent Prediction
 */
export declare const analyseFraudIntent: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<FraudIntentResult>;
export declare const getAnalyseFraudIntentMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseFraudIntent>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseFraudIntent>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalyseFraudIntentMutationResult = NonNullable<Awaited<ReturnType<typeof analyseFraudIntent>>>;
export type AnalyseFraudIntentMutationBody = BodyType<EntityAnalysisInput>;
export type AnalyseFraudIntentMutationError = ErrorType<unknown>;
/**
* @summary M7 - Fraud Intent Prediction
*/
export declare const useAnalyseFraudIntent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseFraudIntent>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseFraudIntent>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getAnalyseDigitalTwinUrl: () => string;
/**
 * @summary M8 - Digital Behaviour Twin
 */
export declare const analyseDigitalTwin: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<DigitalTwinResult>;
export declare const getAnalyseDigitalTwinMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseDigitalTwin>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseDigitalTwin>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalyseDigitalTwinMutationResult = NonNullable<Awaited<ReturnType<typeof analyseDigitalTwin>>>;
export type AnalyseDigitalTwinMutationBody = BodyType<EntityAnalysisInput>;
export type AnalyseDigitalTwinMutationError = ErrorType<unknown>;
/**
* @summary M8 - Digital Behaviour Twin
*/
export declare const useAnalyseDigitalTwin: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseDigitalTwin>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseDigitalTwin>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getMatchPatternsUrl: () => string;
/**
 * @summary M9 - Pattern Genome
 */
export declare const matchPatterns: (patternMatchInput: PatternMatchInput, options?: RequestInit) => Promise<PatternMatchResult>;
export declare const getMatchPatternsMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof matchPatterns>>, TError, {
        data: BodyType<PatternMatchInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof matchPatterns>>, TError, {
    data: BodyType<PatternMatchInput>;
}, TContext>;
export type MatchPatternsMutationResult = NonNullable<Awaited<ReturnType<typeof matchPatterns>>>;
export type MatchPatternsMutationBody = BodyType<PatternMatchInput>;
export type MatchPatternsMutationError = ErrorType<unknown>;
/**
* @summary M9 - Pattern Genome
*/
export declare const useMatchPatterns: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof matchPatterns>>, TError, {
        data: BodyType<PatternMatchInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof matchPatterns>>, TError, {
    data: BodyType<PatternMatchInput>;
}, TContext>;
export declare const getAnalyseRiskRadarUrl: () => string;
/**
 * @summary M10 - Risk Radar (aggregate all module scores)
 */
export declare const analyseRiskRadar: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<RiskRadarResult>;
export declare const getAnalyseRiskRadarMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseRiskRadar>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analyseRiskRadar>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalyseRiskRadarMutationResult = NonNullable<Awaited<ReturnType<typeof analyseRiskRadar>>>;
export type AnalyseRiskRadarMutationBody = BodyType<EntityAnalysisInput>;
export type AnalyseRiskRadarMutationError = ErrorType<unknown>;
/**
* @summary M10 - Risk Radar (aggregate all module scores)
*/
export declare const useAnalyseRiskRadar: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analyseRiskRadar>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analyseRiskRadar>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getExplainDecisionUrl: () => string;
/**
 * @summary M11 - Explainable AI (SHAP explanations)
 */
export declare const explainDecision: (xAIInput: XAIInput, options?: RequestInit) => Promise<XAIResult>;
export declare const getExplainDecisionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof explainDecision>>, TError, {
        data: BodyType<XAIInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof explainDecision>>, TError, {
    data: BodyType<XAIInput>;
}, TContext>;
export type ExplainDecisionMutationResult = NonNullable<Awaited<ReturnType<typeof explainDecision>>>;
export type ExplainDecisionMutationBody = BodyType<XAIInput>;
export type ExplainDecisionMutationError = ErrorType<unknown>;
/**
* @summary M11 - Explainable AI (SHAP explanations)
*/
export declare const useExplainDecision: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof explainDecision>>, TError, {
        data: BodyType<XAIInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof explainDecision>>, TError, {
    data: BodyType<XAIInput>;
}, TContext>;
export declare const getFetchEntityTimelineUrl: (entityId: string) => string;
/**
 * @summary M12 - Timeline Tracker
 */
export declare const fetchEntityTimeline: (entityId: string, options?: RequestInit) => Promise<TimelineResult>;
export declare const getFetchEntityTimelineQueryKey: (entityId: string) => readonly [`/api/timeline/entity/${string}`];
export declare const getFetchEntityTimelineQueryOptions: <TData = Awaited<ReturnType<typeof fetchEntityTimeline>>, TError = ErrorType<unknown>>(entityId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof fetchEntityTimeline>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof fetchEntityTimeline>>, TError, TData> & {
    queryKey: QueryKey;
};
export type FetchEntityTimelineQueryResult = NonNullable<Awaited<ReturnType<typeof fetchEntityTimeline>>>;
export type FetchEntityTimelineQueryError = ErrorType<unknown>;
/**
 * @summary M12 - Timeline Tracker
 */
export declare function useFetchEntityTimeline<TData = Awaited<ReturnType<typeof fetchEntityTimeline>>, TError = ErrorType<unknown>>(entityId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof fetchEntityTimeline>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCalculateTrustScoreUrl: () => string;
/**
 * @summary M13 - Trust Score Engine
 */
export declare const calculateTrustScore: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<TrustScoreResult>;
export declare const getCalculateTrustScoreMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof calculateTrustScore>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof calculateTrustScore>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type CalculateTrustScoreMutationResult = NonNullable<Awaited<ReturnType<typeof calculateTrustScore>>>;
export type CalculateTrustScoreMutationBody = BodyType<EntityAnalysisInput>;
export type CalculateTrustScoreMutationError = ErrorType<unknown>;
/**
* @summary M13 - Trust Score Engine
*/
export declare const useCalculateTrustScore: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof calculateTrustScore>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof calculateTrustScore>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getGenerateReportUrl: () => string;
/**
 * @summary M15 - Investigation Narrative Generator
 */
export declare const generateReport: (reportInput: ReportInput, options?: RequestInit) => Promise<ReportResult>;
export declare const getGenerateReportMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateReport>>, TError, {
        data: BodyType<ReportInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof generateReport>>, TError, {
    data: BodyType<ReportInput>;
}, TContext>;
export type GenerateReportMutationResult = NonNullable<Awaited<ReturnType<typeof generateReport>>>;
export type GenerateReportMutationBody = BodyType<ReportInput>;
export type GenerateReportMutationError = ErrorType<unknown>;
/**
* @summary M15 - Investigation Narrative Generator
*/
export declare const useGenerateReport: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateReport>>, TError, {
        data: BodyType<ReportInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof generateReport>>, TError, {
    data: BodyType<ReportInput>;
}, TContext>;
export declare const getListReportsUrl: () => string;
/**
 * @summary List generated reports
 */
export declare const listReports: (options?: RequestInit) => Promise<ReportResult[]>;
export declare const getListReportsQueryKey: () => readonly ["/api/reports"];
export declare const getListReportsQueryOptions: <TData = Awaited<ReturnType<typeof listReports>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReports>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listReports>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListReportsQueryResult = NonNullable<Awaited<ReturnType<typeof listReports>>>;
export type ListReportsQueryError = ErrorType<unknown>;
/**
 * @summary List generated reports
 */
export declare function useListReports<TData = Awaited<ReturnType<typeof listReports>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReports>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCopilotChatUrl: () => string;
/**
 * @summary M16 - Investigator Copilot chat
 */
export declare const copilotChat: (copilotChatInput: CopilotChatInput, options?: RequestInit) => Promise<CopilotChatResult>;
export declare const getCopilotChatMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof copilotChat>>, TError, {
        data: BodyType<CopilotChatInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof copilotChat>>, TError, {
    data: BodyType<CopilotChatInput>;
}, TContext>;
export type CopilotChatMutationResult = NonNullable<Awaited<ReturnType<typeof copilotChat>>>;
export type CopilotChatMutationBody = BodyType<CopilotChatInput>;
export type CopilotChatMutationError = ErrorType<unknown>;
/**
* @summary M16 - Investigator Copilot chat
*/
export declare const useCopilotChat: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof copilotChat>>, TError, {
        data: BodyType<CopilotChatInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof copilotChat>>, TError, {
    data: BodyType<CopilotChatInput>;
}, TContext>;
export declare const getRunSimulationUrl: () => string;
/**
 * @summary M17 - Fraud Simulation Mode
 */
export declare const runSimulation: (simulationInput: SimulationInput, options?: RequestInit) => Promise<SimulationResult>;
export declare const getRunSimulationMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof runSimulation>>, TError, {
        data: BodyType<SimulationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof runSimulation>>, TError, {
    data: BodyType<SimulationInput>;
}, TContext>;
export type RunSimulationMutationResult = NonNullable<Awaited<ReturnType<typeof runSimulation>>>;
export type RunSimulationMutationBody = BodyType<SimulationInput>;
export type RunSimulationMutationError = ErrorType<unknown>;
/**
* @summary M17 - Fraud Simulation Mode
*/
export declare const useRunSimulation: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof runSimulation>>, TError, {
        data: BodyType<SimulationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof runSimulation>>, TError, {
    data: BodyType<SimulationInput>;
}, TContext>;
export declare const getAnalysePersonalityUrl: () => string;
/**
 * @summary M18 - Risk Personality Profiling
 */
export declare const analysePersonality: (entityAnalysisInput: EntityAnalysisInput, options?: RequestInit) => Promise<PersonalityResult>;
export declare const getAnalysePersonalityMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analysePersonality>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof analysePersonality>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export type AnalysePersonalityMutationResult = NonNullable<Awaited<ReturnType<typeof analysePersonality>>>;
export type AnalysePersonalityMutationBody = BodyType<EntityAnalysisInput>;
export type AnalysePersonalityMutationError = ErrorType<unknown>;
/**
* @summary M18 - Risk Personality Profiling
*/
export declare const useAnalysePersonality: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof analysePersonality>>, TError, {
        data: BodyType<EntityAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof analysePersonality>>, TError, {
    data: BodyType<EntityAnalysisInput>;
}, TContext>;
export declare const getSubmitLearningFeedbackUrl: () => string;
/**
 * @summary M19 - Adaptive Learning feedback
 */
export declare const submitLearningFeedback: (learningFeedbackInput: LearningFeedbackInput, options?: RequestInit) => Promise<MessageResponse>;
export declare const getSubmitLearningFeedbackMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitLearningFeedback>>, TError, {
        data: BodyType<LearningFeedbackInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitLearningFeedback>>, TError, {
    data: BodyType<LearningFeedbackInput>;
}, TContext>;
export type SubmitLearningFeedbackMutationResult = NonNullable<Awaited<ReturnType<typeof submitLearningFeedback>>>;
export type SubmitLearningFeedbackMutationBody = BodyType<LearningFeedbackInput>;
export type SubmitLearningFeedbackMutationError = ErrorType<unknown>;
/**
* @summary M19 - Adaptive Learning feedback
*/
export declare const useSubmitLearningFeedback: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitLearningFeedback>>, TError, {
        data: BodyType<LearningFeedbackInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitLearningFeedback>>, TError, {
    data: BodyType<LearningFeedbackInput>;
}, TContext>;
export declare const getGetDashboardOverviewUrl: () => string;
/**
 * @summary M20 - Risk Heatmap Dashboard overview
 */
export declare const getDashboardOverview: (options?: RequestInit) => Promise<DashboardOverview>;
export declare const getGetDashboardOverviewQueryKey: () => readonly ["/api/dashboard/overview"];
export declare const getGetDashboardOverviewQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardOverview>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardOverview>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardOverview>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardOverviewQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardOverview>>>;
export type GetDashboardOverviewQueryError = ErrorType<unknown>;
/**
 * @summary M20 - Risk Heatmap Dashboard overview
 */
export declare function useGetDashboardOverview<TData = Awaited<ReturnType<typeof getDashboardOverview>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardOverview>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetRiskTrendsUrl: (params?: GetRiskTrendsParams) => string;
/**
 * @summary Risk trends over time
 */
export declare const getRiskTrends: (params?: GetRiskTrendsParams, options?: RequestInit) => Promise<RiskTrendPoint[]>;
export declare const getGetRiskTrendsQueryKey: (params?: GetRiskTrendsParams) => readonly ["/api/dashboard/risk-trends", ...GetRiskTrendsParams[]];
export declare const getGetRiskTrendsQueryOptions: <TData = Awaited<ReturnType<typeof getRiskTrends>>, TError = ErrorType<unknown>>(params?: GetRiskTrendsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRiskTrends>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRiskTrends>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRiskTrendsQueryResult = NonNullable<Awaited<ReturnType<typeof getRiskTrends>>>;
export type GetRiskTrendsQueryError = ErrorType<unknown>;
/**
 * @summary Risk trends over time
 */
export declare function useGetRiskTrends<TData = Awaited<ReturnType<typeof getRiskTrends>>, TError = ErrorType<unknown>>(params?: GetRiskTrendsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRiskTrends>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetTopRiskyEntitiesUrl: (params?: GetTopRiskyEntitiesParams) => string;
/**
 * @summary Top risky entities
 */
export declare const getTopRiskyEntities: (params?: GetTopRiskyEntitiesParams, options?: RequestInit) => Promise<RiskyEntity[]>;
export declare const getGetTopRiskyEntitiesQueryKey: (params?: GetTopRiskyEntitiesParams) => readonly ["/api/dashboard/top-risky-entities", ...GetTopRiskyEntitiesParams[]];
export declare const getGetTopRiskyEntitiesQueryOptions: <TData = Awaited<ReturnType<typeof getTopRiskyEntities>>, TError = ErrorType<unknown>>(params?: GetTopRiskyEntitiesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTopRiskyEntities>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTopRiskyEntities>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTopRiskyEntitiesQueryResult = NonNullable<Awaited<ReturnType<typeof getTopRiskyEntities>>>;
export type GetTopRiskyEntitiesQueryError = ErrorType<unknown>;
/**
 * @summary Top risky entities
 */
export declare function useGetTopRiskyEntities<TData = Awaited<ReturnType<typeof getTopRiskyEntities>>, TError = ErrorType<unknown>>(params?: GetTopRiskyEntitiesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTopRiskyEntities>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetAlertStatsUrl: () => string;
/**
 * @summary Alert statistics breakdown
 */
export declare const getAlertStats: (options?: RequestInit) => Promise<AlertStats>;
export declare const getGetAlertStatsQueryKey: () => readonly ["/api/dashboard/alert-stats"];
export declare const getGetAlertStatsQueryOptions: <TData = Awaited<ReturnType<typeof getAlertStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAlertStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAlertStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAlertStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getAlertStats>>>;
export type GetAlertStatsQueryError = ErrorType<unknown>;
/**
 * @summary Alert statistics breakdown
 */
export declare function useGetAlertStats<TData = Awaited<ReturnType<typeof getAlertStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAlertStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetTransactionVolumeUrl: (params?: GetTransactionVolumeParams) => string;
/**
 * @summary Transaction volume over time
 */
export declare const getTransactionVolume: (params?: GetTransactionVolumeParams, options?: RequestInit) => Promise<TransactionVolumePoint[]>;
export declare const getGetTransactionVolumeQueryKey: (params?: GetTransactionVolumeParams) => readonly ["/api/dashboard/transaction-volume", ...GetTransactionVolumeParams[]];
export declare const getGetTransactionVolumeQueryOptions: <TData = Awaited<ReturnType<typeof getTransactionVolume>>, TError = ErrorType<unknown>>(params?: GetTransactionVolumeParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransactionVolume>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTransactionVolume>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTransactionVolumeQueryResult = NonNullable<Awaited<ReturnType<typeof getTransactionVolume>>>;
export type GetTransactionVolumeQueryError = ErrorType<unknown>;
/**
 * @summary Transaction volume over time
 */
export declare function useGetTransactionVolume<TData = Awaited<ReturnType<typeof getTransactionVolume>>, TError = ErrorType<unknown>>(params?: GetTransactionVolumeParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransactionVolume>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetRiskScoresUrl: (entityId: string) => string;
/**
 * @summary Get composite risk scores for an entity
 */
export declare const getRiskScores: (entityId: string, options?: RequestInit) => Promise<RiskScore>;
export declare const getGetRiskScoresQueryKey: (entityId: string) => readonly [`/api/risk-scores/${string}`];
export declare const getGetRiskScoresQueryOptions: <TData = Awaited<ReturnType<typeof getRiskScores>>, TError = ErrorType<unknown>>(entityId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRiskScores>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRiskScores>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRiskScoresQueryResult = NonNullable<Awaited<ReturnType<typeof getRiskScores>>>;
export type GetRiskScoresQueryError = ErrorType<unknown>;
/**
 * @summary Get composite risk scores for an entity
 */
export declare function useGetRiskScores<TData = Awaited<ReturnType<typeof getRiskScores>>, TError = ErrorType<unknown>>(entityId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRiskScores>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map
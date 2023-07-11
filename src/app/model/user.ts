export interface LoginResponse {
    data: User
    message: any
    statusCode: string
  }
  export interface User {
    refreshToken: RefreshToken
    isFirstLogin: any
    empId: any
    tenantId: number
    id: any
    userName: string
    fullName: string
    avatar: any
    token: string
    isAdmin: boolean
    orgIds: OrgId[]
    permissionParams: any
  }
  
  export interface RefreshToken {
    id: number
    user: string
    token: string
    expires: string
    created: string
    createD_BY_IP: string
    revoked: any
    revokeD_BY_IP: any
    replaceD_BY_TOKEN: any
    reasoN_REVOKED: any
    iS_EXPIRED: boolean
    iS_REVOKED: boolean
    iS_ACTIVE: boolean
  }
  
  export interface OrgId {
    ID: number
    NAME: string
    PARENT_ID: any
    HAS_CHILD: number
    EXPAND: string
    PARENT_NAME: string
    MNG_ID: MngId
    MANAGER_NAME: ManagerName
    CODE: string
    STATUS: string
    SHORT_NAME: any
    CREATE_DATE: string
    UY_BAN: number
    NAME_EN: any
    LEVEL_ORG: number
  }
  
  export interface MngId {}
  
  export interface ManagerName {}
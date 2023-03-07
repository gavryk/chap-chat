export interface AuthSliceProps {
	auth: AuthProps | null;
	errorString: any;
}

export type AuthProps = {
	_id: string;
	userName: string;
	userEmail: string;
	avatarUrl?: string;
};

export interface LoginFormValue {
	userEmail: '';
	password: string;
}

export type RegisterFormValues = {
	userName: string;
	userEmail: string;
	password: string;
	avatarUrl?: string;
};

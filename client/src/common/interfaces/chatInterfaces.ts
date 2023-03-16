export interface ChatSliceProps {
	online: OnlineProp[];
}

export type OnlineProp = {
	userId: string;
	userName: string;
	avatarUrl?: string;
};

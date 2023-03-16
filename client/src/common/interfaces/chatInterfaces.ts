export interface ChatSliceProps {
	online: OnlineProp[];
	ws: any;
}

export type OnlineProp = {
	userId: string;
	userName: string;
	avatarUrl?: string;
};

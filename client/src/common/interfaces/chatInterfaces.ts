export interface ChatSliceProps {
	online: ChatUserProp[];
}

export type ChatUserProp = {
	userId: string;
	userName: string;
	avatarUrl?: string;
};

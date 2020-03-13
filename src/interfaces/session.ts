export interface Session {
    isAuthenticated?: boolean;
    redirectPathOnAuthentication?: string;
}

export const initialSession: Session = {
    isAuthenticated: false,
    redirectPathOnAuthentication: "/producer"
};
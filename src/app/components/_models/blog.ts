export interface Blog {
    id: number;
    title: string;
    content: string;
    created: Date;
    updated_at: Date;
    date?: string;
    category?: string;
    description?: string;
    create_user?: string;
    user_id?: number;
    user_updated?: number;
    is_active:string;
    activo?:string;
    commentCount?: number;
}

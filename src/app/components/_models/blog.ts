export interface Blog {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    date?: string;
    category?: string;
    description?: string;
}

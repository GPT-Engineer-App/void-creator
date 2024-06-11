import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

UserData // table: user_data
    id: number
    created_at: string
    user_data: object

Tasks // table: tasks
    id: number
    created_at: string
    user_id: string
    task_name: string
    task_description: string

UserFiles // table: user_files
    id: number
    created_at: string
    user_id: string
    file_name: string
    file_description: string

FormResults // table: form results
    id: number
    created_at: string
    response: object

Messages // table: messages
    id: number
    created_at: string
    for: string
    message: string

*/

export const useUserData = () => useQuery({
    queryKey: ['user_data'],
    queryFn: () => fromSupabase(supabase.from('user_data').select('*')),
});

export const useAddUserData = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserData) => fromSupabase(supabase.from('user_data').insert([newUserData])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_data');
        },
    });
};

export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});

export const useAddTasks = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useUserFiles = () => useQuery({
    queryKey: ['user_files'],
    queryFn: () => fromSupabase(supabase.from('user_files').select('*')),
});

export const useAddUserFiles = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserFile) => fromSupabase(supabase.from('user_files').insert([newUserFile])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_files');
        },
    });
};

export const useFormResults = () => useQuery({
    queryKey: ['form_results'],
    queryFn: () => fromSupabase(supabase.from('form results').select('*')),
});

export const useAddFormResults = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFormResult) => fromSupabase(supabase.from('form results').insert([newFormResult])),
        onSuccess: () => {
            queryClient.invalidateQueries('form_results');
        },
    });
};

export const useMessages = () => useQuery({
    queryKey: ['messages'],
    queryFn: () => fromSupabase(supabase.from('messages').select('*')),
});

export const useAddMessages = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMessage) => fromSupabase(supabase.from('messages').insert([newMessage])),
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });
};
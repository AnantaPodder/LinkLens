import { useState } from 'react';
import { ApiError } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
}

interface UseApiActions<T> {
  execute: (apiCall: () => Promise<T>) => Promise<T | null>;
  setError: (error: string) => void;
  setFieldErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  reset: () => void;
}

export function useApi<T = any>(): UseApiState<T> & UseApiActions<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
    fieldErrors: {},
  });

  const execute = async (apiCall: () => Promise<T>): Promise<T | null> => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      fieldErrors: {},
    }));

    try {
      const result = await apiCall();
      setState(prev => ({
        ...prev,
        data: result,
        isLoading: false,
      }));
      return result;
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ApiError) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
          fieldErrors: error.errors || {},
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'An unexpected error occurred. Please try again.',
          fieldErrors: {},
        }));
      }
      return null;
    }
  };

  const setError = (error: string) => {
    setState(prev => ({ ...prev, error, fieldErrors: {} }));
  };

  const setFieldErrors = (fieldErrors: Record<string, string>) => {
    setState(prev => ({ ...prev, fieldErrors, error: null }));
  };

  const clearErrors = () => {
    setState(prev => ({ ...prev, error: null, fieldErrors: {} }));
  };

  const reset = () => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      fieldErrors: {},
    });
  };

  return {
    ...state,
    execute,
    setError,
    setFieldErrors,
    clearErrors,
    reset,
  };
}

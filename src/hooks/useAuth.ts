import { useEffect, useRef, useState } from 'react';

type IdentityProvider =
    | 'github'
    | 'twitter'
    | 'google'
    | 'aad'
    | 'facebook'
    | 'apple'
    | 'githubenterprise'
    | string;

export type AuthUser = {
    userId: string;
    username: string;
    identityProvider: IdentityProvider;
    userRoles: string[];
};

type ClientPrincipal = {
    identityProvider: IdentityProvider;
    userId: string;
    userDetails: string;
    userRoles: string[];
};

type MeResponse = {
    clientPrincipal: ClientPrincipal | null;
};

let cachedUser: AuthUser | null | undefined;
let inflight: Promise<AuthUser | null> | null = null;

async function fetchUser(): Promise<AuthUser | null> {
    try {
        const res = await fetch('/.auth/me', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
            return null;
        }
        const data: MeResponse = await res.json();
        if (!data?.clientPrincipal) return null;
        const principal = data.clientPrincipal;
        const user: AuthUser = {
            userId: principal.userId,
            username: principal.userDetails,
            identityProvider: principal.identityProvider,
            userRoles: principal.userRoles ?? [],
        };
        return user;
    } catch {
        return null;
    }
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null | undefined>(cachedUser);
    const [loading, setLoading] = useState<boolean>(cachedUser === undefined);
    const [error, setError] = useState<Error | null>(null);
    const didStart = useRef(false);

    useEffect(() => {
        if (cachedUser !== undefined) {
            setUser(cachedUser);
            setLoading(false);
            return;
        }
        if (didStart.current) return;
        didStart.current = true;

        const start = async () => {
            try {
                if (!inflight) {
                    inflight = fetchUser();
                }
                const u = await inflight;
                cachedUser = u;
                setUser(u);
            } catch (e) {
                const err = e instanceof Error ? e : new Error('Unknown auth error');
                setError(err);
            } finally {
                setLoading(false);
                inflight = null;
            }
        };
        start();
    }, []);

    const refresh = async () => {
        setLoading(true);
        try {
            const u = await fetchUser();
            cachedUser = u;
            setUser(u);
        } catch (e) {
            const err = e instanceof Error ? e : new Error('Unknown auth error');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { user: user ?? null, loading, error, refresh };
}



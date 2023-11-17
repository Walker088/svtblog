import type { Handle } from '@sveltejs/kit';

import jwt from 'jsonwebtoken';
import { PRV_JWT_ACCESS_SECRET } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
    const { request, locals } = event
    console.log(request);
    console.log(locals);

    const authCookie = event.cookies.get('AuthorizationToken');

    if (authCookie) {
        const token = authCookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, PRV_JWT_ACCESS_SECRET);
            console.log(jwtUser);
        } catch (error) {
            
        }
    }

    return await resolve(event);
};

import React from 'react';

export default function Authenticated({user}) {
    return(
        <div>
            <div>
                <p>email: {user.email}</p>
                <p>id: {user.id}</p>
            </div>
            <h1>This is the authenticated route.</h1>
        </div>
    )
}
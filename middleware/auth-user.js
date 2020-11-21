

export default async ({ $auth, redirect, store }, next) => {
    const user = await $auth.user;
    await store.dispatch('getUserIfLogged');
    if(user &&  user.role === 'USER_ROLE' ){         
        // let user login
        next()        
    }else{        
        return redirect('/unirse/login')
    }
}
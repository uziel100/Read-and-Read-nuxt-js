export default   (context) => {
    const { $auth, redirect } = context;
      
    if(!$auth.loggedIn){
        return redirect('/unirse/login')
    }
}
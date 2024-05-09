class ErrorHandler extends Comment{
    state = {
        error: null
    };

    static getDerivedStateFromError(error){
        return { error };
    }

    render(){
        const { error } = this.state;

        if(error){
            return (
                <div>
                    <h1>Its an error</h1>
                    <p>{error.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default new ErrorHandler;
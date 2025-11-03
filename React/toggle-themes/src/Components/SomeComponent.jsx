    function SomeComponent({ children }) {
        console.log('rendering from SomeComp');
        return (
            <div>
                {children}
            </div>
        )
    }

    export default SomeComponent
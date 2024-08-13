const RenderViews = ({render, data}) =>{
    const CurrentView = data[render] ?? data[0];
    return(
        <>
            <CurrentView />
        </>
    );
};

export default RenderViews;
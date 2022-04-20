

export default function Content({content}) {
    return(
        
        <div id = "outer_frame" style = {{overflow: "hidden"}}>
            <div id = "inner_frame" style = {{overflow: "auto"}}>
                {content}
            </div>
        </div>
    );
}


import React, {useEffect, useState} from "react";

function Test() {
    const [Name, setName] = useState([]);

    useEffect(() => {
        // @ts-ignore
        const Name = JSON.parse(localStorage.getItem("Name"));
        if (Name) {
            setName(Name);
        }
    }, []);

    return (
        <div>
            <p>{Name}</p>
        </div>
    );
}

export default Test;
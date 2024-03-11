import { useEffect, useState } from "react"


const BasicForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [allEntry, setAllEntry] = useState([]);


    const handlerOnLoginBtn = (event) => {
        event.preventDefault();
        setAllEntry([...allEntry, { email: email, password: password }]);
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(allEntry))
    }, [allEntry])

    return <>
        <form onSubmit={handlerOnLoginBtn}>
            <div>
                <label htmlFor="email"> Email Address </label>
            </div>
            <div>
                <input type="email"
                    onChange={(event) => { setEmail(event.target.value) }}
                    value={email}
                    required />
            </div>
            <div>
                <label htmlFor="password"> Password </label>
            </div>
            <div>
                <input type="password"
                    onChange={(event) => { setPassword(event.target.value) }}
                    value={password}
                    required
                />
            </div>
            <div>
                <button type="submit"> Login </button>
            </div>
        </form>

        <div className="listing_entries">
            {allEntry.map((currElem, index) => {
                return <div key={index}>
                    <h2> {currElem.email} - {currElem.password} </h2>
                </div>
            })}
        </div>
    </>
}


export default BasicForm;
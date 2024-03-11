import { useEffect, useState } from "react"

const getDataAfterRefreshingPage = () => {
    let data = localStorage.getItem('users');
    if (data) {
        return JSON.parse(localStorage.getItem('users'));
    }
}

const BasicForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [allEntry, setAllEntry] = useState(getDataAfterRefreshingPage());



    const handlerOnLoginBtn = (event) => {
        event.preventDefault();
        const newData = [...allEntry, {
            id: new Date().getTime().toString(),
            email: email,
            password: password,
        }]
        setAllEntry(newData);
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(allEntry))
    }, [allEntry])

    const handlerOnDeleteBtn = (del) => {
        const deleteButton = allEntry.filter((arr) => {
            return arr.id !== del
        })
        setAllEntry(deleteButton);
    }
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
            {/* {allEntry.map((currElem) => {
                return <div key={currElem.id}>
                    <h2> {currElem.email} - {currElem.password} </h2>
                    <button onClick={() => handlerOnDeleteBtn(currElem.id)}> Delete </button>
                </div>
            })} */}

            {allEntry.map((currElem) => {
                const { id, email, password } = currElem;
                return <div key={id}>
                    <h2> {email} - {password} </h2>
                    <button onClick={() => handlerOnDeleteBtn(id)}> Delete </button>
                </div>
            })}
        </div>
    </>
}


export default BasicForm;
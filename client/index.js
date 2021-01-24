const main = async () => {
    console.log("hmm")
    let selfid = ""
    let update = await fetch("/api/all")
    let updateJSON = await update.json()
    console.log(updateJSON)

    let everyone = []
    Object.keys(updateJSON).map(e => (updateJSON[e])).map(e => {
        console.log(THREE)
        everyone.push(new THREE.Vector3(Object.values(e.pos)))
        // console.log(e)
    })
}
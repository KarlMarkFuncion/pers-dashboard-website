import Notification from "./Notification";

const Inbox = () => {
    return <>
        <div className="p-5 mx-auto flex flex-col container h-fill gap-5">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <div className="py-3 flex flex-col gap-2">
                <Notification />
                <Notification />
                <Notification />
            </div>
        </div>
    </>
}

export default Inbox;
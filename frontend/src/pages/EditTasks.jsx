import Container from "../component/Container/Container";
import EditTasksForm from "../component/Form/EditTasksForm";

function EditTaskListPage () {
    return (
        <main>
            <Container>
                <h1>EDIT Tasks</h1>
                <EditTasksForm />
            </Container>
        </main>
    );
}

export default EditTaskListPage;
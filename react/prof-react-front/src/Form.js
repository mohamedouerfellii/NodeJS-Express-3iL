import {Component} from "react";
import ProfService from "./ProfService";
import { useNavigate, useParams } from "react-router-dom";

function TextInput(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label} : </label>
            <input type="text" id={props.id}
                   value={props.value} className="form-control"
                   onChange={props.onChange}
            />
        </div>
    );
}

function FormWrapper(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <Form {...props} params={params} navigate={navigate} />;
}

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: "xxx",
            prenom: "ooo",
            bureau: "0",
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }

    componentDidMount() {
        if(this.props.edit) {
            const id = this.props.params?.id;
            if (!id) return;

            ProfService.getById(id).then((response) => {
                this.setState({...response.data.data});
            });
        }
    }

    changeHandler(evt) {
        const fieldId = evt.target.id;
        let resultingState = this.state;
        resultingState[fieldId] = evt.target.value;
        this.setState(resultingState);
    }

    saveHandler() {
        if(this.props.edit) {
            const id = this.props.params?.id;
            if (!id) return;
            console.log('update');
            ProfService.updateProf({...this.state, id: id}).then(() => {
                this.props.navigate("/");
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log('create');
            ProfService.createProf({...this.state, password: ''}).then(() => {
                this.props.navigate("/");
            });
        }
    }

    cancelHandler() {
        this.props.navigate("/");
    }

    render() {
        return (
            <div>
                <TextInput id="nom" label="Nom"
                           value={this.state.nom} onChange={this.changeHandler} />
                <TextInput id="prenom" label="Prénom"
                           value={this.state.prenom} onChange={this.changeHandler} />
                <TextInput id="bureau" label="Bureau"
                           value={this.state.bureau} onChange={this.changeHandler} />
                <button className="btn btn-primary" onClick={this.saveHandler}>Enregistrer</button>
                <button className="btn btn-secondary" onClick={this.cancelHandler}>Retour</button>
                <pre>{JSON.stringify(this.state)}</pre>
            </div>
        );
    }
}

export default FormWrapper;
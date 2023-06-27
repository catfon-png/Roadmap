import React, { useState, FormEvent } from 'react'
// import { FormControl, InputLabel, Input, FormHelperText, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { TextField, Button, FormHelperText } from '@mui/material';
import './Form.css'

interface Activity {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
}
interface Project {
    title: string;
    startDate: string;
    endDate: string;
}

export const Form: React.FC = () => {
    const [infoProject, setInfoProject] = useState({ title: '', startDate: '', endDate: '' })
    const [activities, setActivities] = useState([{ name: '', description: '', startDate: '', endDate: '' }]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        console.log(infoProject)
        console.log(activities)

    }

    const handleInfoProjectChange = (field: keyof Project, value: string) => {
        setInfoProject((prevInfoProject) => ({
            ...prevInfoProject,
            [field]: value,
        }));
    };

    const createActivity = () => {
        setActivities([...activities, { name: '', description: '', startDate: '', endDate: '' }])

    }
    
    const handleActivityChange = (index: number, field: keyof Activity, value: string) => {
        const updatedActivities = [...activities];
        updatedActivities[index][field] = value;
        setActivities(updatedActivities);
    };
    return (
        <>
            <div className="form-description">
                <h1 className="title">Build your very own Roadmap!</h1>
                <p className="description">Just fill out this form with your project information.</p>
            </div>
            <div className='form'>
                <form onSubmit={submitHandler} >
                    <div className="info-project">
                        <TextField label="Title of your Project" variant="standard" margin="normal" required
                            onChange={(e) => handleInfoProjectChange('title', e.target.value)}
                        />
                        <TextField type="date" variant="outlined" margin="normal" helperText="Enter the starting date of your project" required
                            onChange={(e) => handleInfoProjectChange('startDate', e.target.value)}

                        />
                        <TextField type="date" variant="outlined" margin="normal" helperText="Enter the ending date of your project"
                            onChange={(e) => handleInfoProjectChange('endDate', e.target.value)}

                        />
                    </div>
                    {activities.map((activity, index) => (
                        <div key={index}>
                            <h2>Activity {index + 1}</h2>
                            <div className="activity-name">
                                <TextField
                                    label="Name of Activity"
                                    required
                                    variant="standard"
                                    margin="normal"
                                    value={activity.name}
                                    onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                                />
                                <TextField
                                    label="Description of activity"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    value={activity.description}
                                    onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                                />
                            </div>
                            <div className="activity-dates">
                                <TextField
                                    type="date"
                                    variant="outlined"
                                    margin="normal"
                                    value={activity.startDate}
                                    onChange={(e) => handleActivityChange(index, 'startDate', e.target.value)}
                                    helperText="Enter activity starting date"
                                />
                                <TextField
                                    type="date"
                                    variant="outlined"
                                    margin="normal"
                                    value={activity.endDate}
                                    onChange={(e) => handleActivityChange(index, 'endDate', e.target.value)}
                                    helperText="Enter activity ending date"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="btn-container">
                        <Button variant="outlined" color="primary" onClick={createActivity}>Add another activity</Button>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                    {/* </FormControl> */}
                </form>
            </div>
        </>

    )
}

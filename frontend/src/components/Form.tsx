import React, { useState, FormEvent } from 'react'
// import { FormControl, InputLabel, Input, FormHelperText, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { TextField, Button, FormHelperText } from '@mui/material';

interface Activity {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
}

export const Form: React.FC = () => {
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
    }
    const [activities, setActivities] = useState([{ name: '', description: '', startDate: '', endDate: '' }]);

    const createActivity = () => {
        setActivities([...activities, { name: '', description: '', startDate: '', endDate: '' }])

    }

    const handleActivityChange = (index: number, field: keyof Activity, value: string) => {
        const updatedActivities = [...activities];
        updatedActivities[index][field] = value;
        setActivities(updatedActivities);
    };
    return (
        <div>
            <form onSubmit={submitHandler} >
                <div className="info-proj">
                    <TextField label="Title of your Project" variant="standard" margin="normal" />
                    <TextField type="date" variant="outlined" margin="normal" helperText="Enter the starting date of your project" />
                    <TextField type="date" variant="outlined" margin="normal" helperText="Enter the ending date of your project"/>

                </div>
                {activities.map((activity, index) => (
                    <div key={index}>
                        <h1>Activity {index + 1}</h1>
                        <TextField
                            label="Name of Activity"
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
                        <TextField
                            type="date"
                            variant="outlined"
                            margin="normal"
                            value={activity.startDate}
                            onChange={(e) => handleActivityChange(index, 'startDate', e.target.value)}
                            helperText="Enter the starting date"
                        />
                        <TextField
                            type="date"
                            variant="outlined"
                            margin="normal"
                            value={activity.endDate}
                            onChange={(e) => handleActivityChange(index, 'endDate', e.target.value)}
                            helperText="Enter the ending date"
                        />

                    </div>
                ))}
                <Button variant="contained" color="primary" type="submit" onClick={createActivity}>Create another activity</Button>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
                {/* </FormControl> */}
            </form>
        </div>
    )
}

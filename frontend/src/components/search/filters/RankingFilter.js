import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export default function RankingFilter(props) {
    const [valueRanking, setValueRanking] = useState([10, 50]);

    const handleChangeRanking = (event, newValue) => {
        setValueRanking(newValue);
    };

    return (
        <div>
            <Typography id="range-slider" gutterBottom align='left'>
                Ranking: {valueRanking[0]} - {valueRanking[1]} %
            </Typography>
            <Slider
                value={valueRanking}
                onChange={handleChangeRanking}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={1}
                max={100}
            />
        </div>

    );

}




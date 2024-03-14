import React, { useState, useEffect } from 'react'; //import for use later on

function DefensiveStats() {


    useEffect(() => {
        const fetchDefensiveStats = async () => {
            if(searchTerm) {
                const url = `http://localhost:5001/TeamStats/defensive?name=${encodeURIComponent(searchTerm)}`;
                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                        'Accept': 'application/json',
                        },
                        mode: 'cors',
                    });
                    if (response.ok) {
                        const data =
                    }
                }
            }
        }
    }
    
    )
}
import React, { useEffect, useState } from 'react';
import PurchaseHistoryCard from '../components/PurchaseHistoryCard';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { gethistory } from '../api/api';
import { useSelector } from 'react-redux';

const PurchaseHistoryPage = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  const [data,setData] = useState([]);

  const getHistory = async()=>{
    const res = await gethistory({
      email : currentUser.user.email
    })

    console.log(res)

    setData(res.data.orders);
  }

  useEffect(()=>{
    getHistory()
  },[])

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" component="h1" align="center" sx={{ marginBottom: 3 }}>
        Your Purchase History
      </Typography>

      {/* Purchase History List */}
      <Box>
        {data.length === 0 ? (
          <Paper sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              You haven't made any purchases yet!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {data.map(purchase => (
              <Grid item xs={12} sm={6} md={4} key={data.purchaseId}>
                <PurchaseHistoryCard purchase={purchase} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default PurchaseHistoryPage;

import { Box, Tabs as MuiTabs, Tab, Badge, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';

const Tabs = ({ activeTab, onTabChange, selectedCounts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);

  const tabItems = [
    { id: 'starter', label: 'Starters', icon: '🍢' },
    { id: 'mainCourse', label: 'Main Course', icon: '🍛' },
    { id: 'dessert', label: 'Desserts', icon: '🍰' },
    { id: 'classic', label: 'Classic', icon: '⭐' }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'background.paper',
      borderBottom: 1,
      borderColor: 'divider',
      position: 'sticky',
      top: 64,
      zIndex: 1100,
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }}>
      <MuiTabs
        value={value}
        onChange={handleChange}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons="auto"
        aria-label="menu categories"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: 3,
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            minWidth: 'auto',
            padding: '12px 16px',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: theme.palette.text.secondary,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            }
          }
        }}
      >
        {tabItems.map((tab) => (
          <Tab
            key={tab.id}
            icon={
              <Box sx={{ 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Box component="span" sx={{ 
                  fontSize: '1.5rem',
                  mb: 0.5,
                  transition: 'all 0.3s ease',
                  transform: activeTab === tab.id ? 'scale(1.2)' : 'scale(1)'
                }}>
                  {tab.icon}
                </Box>
                <Box component="span">
                  {tab.label}
                </Box>
                {selectedCounts[tab.id] > 0 && (
                  <Badge
                    badgeContent={selectedCounts[tab.id]}
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -12,
                      '& .MuiBadge-badge': {
                        right: 0,
                        top: 0,
                        border: `2px solid ${theme.palette.background.paper}`,
                        padding: '0 4px',
                        minWidth: 20,
                        height: 20,
                        borderRadius: 10,
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                )}
              </Box>
            }
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
            sx={{
              minHeight: 72,
              '&.Mui-selected': {
                '& span': {
                  color: theme.palette.primary.main,
                }
              }
            }}
          />
        ))}
      </MuiTabs>
    </Box>
  );
};

export default Tabs;
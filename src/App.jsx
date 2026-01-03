import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Button, 
  Container, 
  Badge, 
  Paper,
  InputBase,
  Divider,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Restaurant as RestaurantIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  LocalDining as LocalDiningIcon,
  Cake as CakeIcon,
  Star as StarIcon,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Tabs from './components/Tabs/Tabs';
import DishList from './components/DishList/DishList';
import dishesData from './data/dishes';
import './App.css';

const MainContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('mainCourse');
  const [expandedDish, setExpandedDish] = useState(null);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const tabFromUrl = location.pathname.split('/')[1] || 'mainCourse';
    setActiveTab(tabFromUrl);
  }, [location]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/${newTab}`);
  };

  const toggleDishSelection = (dish) => {
    setSelectedDishes(prev => {
      const isDishSelected = prev.some(d => d.id === dish.id);
      if (isDishSelected) {
        return prev.filter(d => d.id !== dish.id);
      } else {
        return [...prev, { ...dish, category: activeTab }];
      }
    });
  };

  const toggleDishExpansion = (dishId) => {
    setExpandedDish(expandedDish === dishId ? null : dishId);
  };

  const handleIngredientClick = (dish) => {
    setSelectedDish(dish);
    setShowIngredientModal(true);
  };

  const filteredDishes = dishesData[activeTab]?.filter(dish => 
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const selectedCount = selectedDishes.length;
  const selectedInCurrentCategory = selectedDishes.filter(dish => dish.category === activeTab).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <AppBar position="fixed" color="primary" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <RestaurantIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Foodie's Delight
          </Typography>
          <IconButton color="inherit" aria-label="cart" sx={{ mr: 1 }}>
            <Badge badgeContent={selectedDishes.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
        
        {/* Search Bar */}
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600,
            mx: 'auto',
            mb: 2,
            bgcolor: 'background.paper',
            borderRadius: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, py: 1 }}
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search dishes' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
        
        <Tabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          selectedCounts={{
            starter: selectedDishes.filter(d => d.category === 'starter').length,
            mainCourse: selectedDishes.filter(d => d.category === 'mainCourse').length,
            dessert: selectedDishes.filter(d => d.category === 'dessert').length,
            classic: selectedDishes.filter(d => d.category === 'classic').length
          }}
        />
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        {/* Sidebar for desktop */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                bgcolor: '#ffffff',
                borderRight: '1px solid rgba(0, 0, 0, 0.05)',
                mt: 8
              },
            }}
          >
            <List>
              {['Home', 'Starter', 'Main Course', 'Dessert', 'Classic'].map((text, index) => (
                <ListItem 
                  button 
                  key={text}
                  selected={activeTab === text.toLowerCase().replace(' ', '')}
                  onClick={() => handleTabChange(text.toLowerCase().replace(' ', ''))}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      borderLeft: '4px solid #1976d2',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    py: 1.5,
                    pl: 4,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {index === 0 && <HomeIcon color={activeTab === 'home' ? 'primary' : 'action'} />}
                    {index === 1 && <LocalDiningIcon color={activeTab === 'starter' ? 'primary' : 'action'} />}
                    {index === 2 && <RestaurantIcon color={activeTab === 'maincourse' ? 'primary' : 'action'} />}
                    {index === 3 && <CakeIcon color={activeTab === 'dessert' ? 'primary' : 'action'} />}
                    {index === 4 && <StarIcon color={activeTab === 'classic' ? 'primary' : 'action'} />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={text} 
                    primaryTypographyProps={{
                      color: activeTab === text.toLowerCase().replace(' ', '') ? 'primary' : 'text.primary',
                      fontWeight: activeTab === text.toLowerCase().replace(' ', '') ? 'medium' : 'regular'
                    }}
                  />
                  {selectedDishes.filter(d => d.category === text.toLowerCase().replace(' ', '')).length > 0 && (
                    <Badge 
                      badgeContent={selectedDishes.filter(d => d.category === text.toLowerCase().replace(' ', '')).length} 
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
        
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Box sx={{ pt: 8 }}>
            <List>
              {['Home', 'Starter', 'Main Course', 'Dessert', 'Classic'].map((text, index) => (
                <ListItem 
                  button 
                  key={text}
                  selected={activeTab === text.toLowerCase().replace(' ', '')}
                  onClick={() => {
                    handleTabChange(text.toLowerCase().replace(' ', ''));
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <LocalDiningIcon />}
                    {index === 2 && <RestaurantIcon />}
                    {index === 3 && <CakeIcon />}
                    {index === 4 && <StarIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        
        {/* Main content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            ml: { sm: '240px' },
            mt: { xs: 2, sm: 0 }
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
              {activeTab === 'mainCourse' ? 'Main Course' : 
               activeTab === 'starter' ? 'Starters' :
               activeTab === 'dessert' ? 'Desserts' :
               activeTab === 'classic' ? 'Classic Dishes' : 'Menu'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {selectedInCurrentCategory} selected
              </Typography>
            </Box>
          </Box>
          
          <DishList 
            dishes={filteredDishes}
            selectedDishes={selectedDishes}
            expandedDish={expandedDish}
            onToggleDish={toggleDishSelection}
            onToggleExpand={toggleDishExpansion}
            onIngredientClick={handleIngredientClick}
          />
        </Box>
      </Box>

      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: { sm: '240px' },
          right: 0, 
          bgcolor: 'background.paper', 
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Total Selected
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {selectedCount} {selectedCount === 1 ? 'Item' : 'Items'}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary"
          disabled={selectedCount === 0}
          size="large"
          sx={{
            borderRadius: '50px',
            px: 4,
            py: 1,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
              transform: 'translateY(-1px)'
            },
            '&:active': {
              transform: 'translateY(0)'
            },
            '&.Mui-disabled': {
              backgroundColor: '#e0e0e0',
              color: '#9e9e9e',
              boxShadow: 'none'
            }
          }}
        >
          Continue to Checkout
        </Button>
      </Box>

      {showIngredientModal && selectedDish && (
        <Box 
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300,
            p: 2
          }}
          onClick={() => setShowIngredientModal(false)}
        >
          <Box 
            sx={{
              bgcolor: 'background.paper',
              p: 3,
              borderRadius: 2,
              maxWidth: 500,
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <Typography variant="h6" gutterBottom>
              {selectedDish.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {selectedDish.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Ingredients:
            </Typography>
            <ul>
              {selectedDish.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    {ingredient.name}: {ingredient.quantity}
                  </Typography>
                </li>
              ))}
            </ul>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={() => setShowIngredientModal(false)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/:category" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;

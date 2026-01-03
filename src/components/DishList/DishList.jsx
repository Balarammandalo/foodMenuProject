import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  IconButton, 
  Chip, 
  CardActionArea,
  CardActions,
  Collapse,
  Divider,
  Rating,
  Tooltip,
  Zoom
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  InfoOutlined as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  LocalFireDepartment as SpicyIcon,
  LocalFireDepartmentOutlined as NotSpicyIcon
} from '@mui/icons-material';

const DishCard = ({ 
  dish, 
  isSelected, 
  isExpanded, 
  onToggleSelect, 
  onToggleExpand,
  onIngredientClick
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(Math.floor(Math.random() * 3) + 3); // Random rating between 3-5
  const [isSpicy] = useState(Math.random() > 0.5); // Randomly set if dish is spicy
  return (
    <Card 
      sx={{ 
        mb: 3, 
        borderRadius: 3, 
        overflow: 'hidden', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        {/* Dish Image */}
        <Box sx={{ position: 'relative', width: { xs: '100%', sm: '250px' }, height: { xs: '200px', sm: '200px' } }}>
          <CardMedia
            component="img"
            sx={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)'
              },
              backgroundColor: '#f5f5f5' // Fallback background color
            }}
            image={dish.image || `https://source.unsplash.com/featured/500x400/?${dish.name.split(' ').join(',')},indian,food`}
            alt={dish.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/featured/500x400/?${dish.name.split(' ').join(',')},food`;
            }}
          />
          {/* Veg/Non-Veg Badge */}
          <Box 
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: 'background.paper',
              borderRadius: '50%',
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 1
            }}
          >
            <Box 
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: dish.isVeg ? 'success.main' : 'error.main',
                border: '2px solid',
                borderColor: 'background.paper',
                boxShadow: '0 0 0 1px ' + (dish.isVeg ? '#4caf50' : '#f44336')
              }}
            />
          </Box>
          
          {/* Spicy Indicator */}
          {isSpicy && (
            <Tooltip title="Spicy" arrow TransitionComponent={Zoom}>
              <Box 
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 1
                }}
              >
                <SpicyIcon color="error" fontSize="small" />
              </Box>
            </Tooltip>
          )}
          
          {/* Favorite Button */}
          <IconButton
            aria-label="add to favorites"
            onClick={() => setIsFavorite(!isFavorite)}
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)'
              }
            }}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
        
        {/* Dish Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto', p: 3, pb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ pr: 2 }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  fontWeight="bold"
                  sx={{ 
                    mb: 0.5,
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  {dish.name}
                </Typography>
                
                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    value={rating}
                    precision={0.5}
                    readOnly
                    size="small"
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    sx={{ color: '#ffb400', mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    ({Math.floor(Math.random() * 100) + 10} reviews)
                  </Typography>
                </Box>
                
                {/* Description */}
                <Collapse in={isExpanded} collapsedSize={42}>
                  <Typography variant="body2" color="text.secondary" component="div">
                    {dish.description}
                    {dish.description.length < 100 && !isExpanded && (
                      <Box component="span" sx={{ display: 'block', height: '1.5em' }} />
                    )}
                  </Typography>
                </Collapse>
                
                <Button 
                  size="small" 
                  onClick={() => onToggleExpand(dish.id)}
                  sx={{ 
                    mt: 0.5, 
                    p: 0, 
                    minWidth: 'auto', 
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
              </Box>
              
              {/* Price and Add Button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                  ${(Math.random() * 15 + 5).toFixed(2)}
                </Typography>
                <Button 
                  variant={isSelected ? 'outlined' : 'contained'}
                  color={isSelected ? 'error' : 'primary'}
                  size="medium"
                  startIcon={isSelected ? <RemoveIcon /> : <AddIcon />}
                  onClick={() => onToggleSelect(dish)}
                  sx={{ 
                    minWidth: '120px',
                    textTransform: 'none',
                    borderRadius: 2,
                    height: '40px',
                    fontWeight: 'bold',
                    boxShadow: isSelected ? 'none' : '0 4px 12px rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                      boxShadow: isSelected ? 'none' : '0 6px 16px rgba(25, 118, 210, 0.3)',
                      transform: isSelected ? 'none' : 'translateY(-1px)'
                    },
                    '&:active': {
                      transform: isSelected ? 'none' : 'translateY(0)'
                    }
                  }}
                >
                  {isSelected ? 'Remove' : 'Add to Cart'}
                </Button>
              </Box>
            </Box>
          </CardContent>
          
          <Divider sx={{ mx: 3 }} />
          
          {/* Card Footer */}
          <CardActions sx={{ p: '8px 16px', justifyContent: 'space-between' }}>
            <Button 
              size="small" 
              startIcon={<InfoIcon />}
              onClick={() => onIngredientClick(dish)}
              sx={{ 
                textTransform: 'none',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent'
                }
              }}
            >
              View Ingredients
            </Button>
            
            {/* Dietary Info Chips */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {dish.isVeg && (
                <Chip 
                  label="Vegetarian" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                    color: '#4caf50',
                    fontWeight: 'medium',
                    fontSize: '0.7rem'
                  }} 
                />
              )}
              {isSpicy && (
                <Chip 
                  label="Spicy" 
                  size="small" 
                  icon={<SpicyIcon fontSize="small" />}
                  sx={{ 
                    bgcolor: 'rgba(244, 67, 54, 0.1)',
                    color: '#f44336',
                    fontWeight: 'medium',
                    fontSize: '0.7rem',
                    '& .MuiChip-icon': {
                      color: '#f44336',
                      marginLeft: '4px'
                    }
                  }} 
                />
              )}
              {dish.isVeg === false && (
                <Chip 
                  label="Non-Veg" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(244, 67, 54, 0.1)',
                    color: '#f44336',
                    fontWeight: 'medium',
                    fontSize: '0.7rem'
                  }} 
                />
              )}
            </Box>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

const DishList = ({ 
  dishes, 
  selectedDishes, 
  expandedDish, 
  onToggleDish, 
  onToggleExpand,
  onIngredientClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'veg') return matchesSearch && dish.isVeg;
    if (filter === 'nonVeg') return matchesSearch && !dish.isVeg;
    if (filter === 'spicy') return matchesSearch && Math.random() > 0.5; // Mock spicy filter
    
    return matchesSearch;
  });

  if (dishes.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <LocalDiningIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No dishes found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We couldn't find any dishes matching your criteria.
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => {
            setSearchQuery('');
            setFilter('all');
          }}
        >
          Clear Filters
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter Chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {[
          { value: 'all', label: 'All Items' },
          { value: 'veg', label: 'Vegetarian' },
          { value: 'nonVeg', label: 'Non-Vegetarian' },
          { value: 'spicy', label: 'Spicy' },
        ].map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            onClick={() => setFilter(item.value)}
            variant={filter === item.value ? 'filled' : 'outlined'}
            color={filter === item.value ? 'primary' : 'default'}
            sx={{
              borderRadius: 1,
              fontWeight: filter === item.value ? 'bold' : 'normal',
              '&:hover': {
                bgcolor: filter === item.value ? 'primary.main' : 'action.hover',
                color: filter === item.value ? 'primary.contrastText' : 'text.primary',
              },
            }}
          />
        ))}
      </Box>

      {/* Dish Grid */}
      <Box sx={{ 
        display: 'grid',
        gap: 3,
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(auto-fill, minmax(350px, 1fr))' 
        },
        '& > *': {
          minWidth: 0, // Fixes flexbox issues with long content
        }
      }}>
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              isSelected={selectedDishes.some(d => d.id === dish.id)}
              isExpanded={expandedDish === dish.id}
              onToggleSelect={onToggleDish}
              onToggleExpand={onToggleExpand}
              onIngredientClick={onIngredientClick}
            />
          ))
        ) : (
          <Box 
            sx={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              py: 8,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No matching dishes found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We couldn't find any dishes matching "{searchQuery}".
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DishList;

import React from 'react';

const JumbotronBackground = ({children}) => {
    return (
        <div className="jumbotron jumbotron-fluid"
             style={{position: 'relative', width: '100%', height: '400px', borderRadius: '0'}}>
            <div
                className="jumbotron-background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg")',
                    backgroundSize: 'cover',
                    opacity: 0.4,
                    zIndex: -1,
                }}
            />
            {children}
        </div>
    );
};

export default JumbotronBackground;
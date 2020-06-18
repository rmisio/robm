import React, { useState, useEffect, useRef } from 'react';
import './lazyLoadImage.scss';

// todo: test some edge cases like images loaded out of order
// they are declare, varying scroll props, etc...

export default function LazyLoadImage(props) {
  const [displayImages, setDisplayImages] = useState([]);
  const [stateClasses, setStateClasses] = useState('');
  const [scrollLoadImages, setScrollLoadImages] = useState([]);
  const wrapperRef = useRef(null);
  const loadedImages = useRef({});
  const scrollObservers = useRef({});

  const getImageKey = img => {
    const key =
      img &&
      (
        (img.src && img.src.replace(/ /g,'')) ||
        (img.srcSet && img.srcSet.replace(/ /g,''))
      ) ||
      null;
    return typeof key === 'string' ? key.slice(0, 100) : key;
  };

  const cleanUp = () => {
    Object.keys(
      scrollObservers.current
    ).forEach(
      obKey =>
        scrollObservers
          .current[obKey]
          .unobserve(wrapperRef.current)
    );
    scrollObservers.current = {};
    loadedImages.current = {};
  }

  useEffect(() => {
    return () => cleanUp();
  }, []);

  // TODO: I beleive a ref change on props.images is the only thing that will trigger
  // this. Are we cool with mutating the prop having no effect?
  useEffect(() => {
    cleanUp();
    const imagesToDisplay = [];
    const imageToLoadOnScroll = [];

    props
      .images
      .forEach((img, index) => {
        const key = getImageKey(img);

        if (!key) {
          console.warn(`Ignoring image at ${index} because it does not have ` +
            'a src or srcset attribute.');
          return;
        }

        if (img.loadOnScroll) {
          imageToLoadOnScroll.push(img);
        } else {
          imagesToDisplay.push(img);
        }
      });
    
    setScrollLoadImages(imageToLoadOnScroll);
    setDisplayImages(imagesToDisplay);
    setStateClasses('');
  }, [props.images]);

  useEffect(() => {
    if (!scrollLoadImages.length) return;

    scrollLoadImages.forEach(img => {
      const key = getImageKey(img);

      const observer = new IntersectionObserver(e => {
        if (e[0].isIntersecting) {
          // cancel any observers for images that are before
          // this image
          displayImages.forEach(img => {
            const obs = scrollObservers[key];
            if (obs) obs.unobserve(wrapperRef.current);
          });
          setDisplayImages([...displayImages, img]);
        }
      }, {
        rootMargin:
          typeof img.scrollMargin === 'string' &&
          img.scrollMargin ? 
            img.scrollMargin :
            '0px',
          threshold:
            typeof img.scrollThreshold === 'number' ? 
              img.scrollThreshold :
              0,
      });

      observer.observe(wrapperRef.current);
      scrollObservers.current[key] = observer;
    });
  }, [scrollLoadImages]);

  // todo: check that props.aspectRatioPercentage is provided and valid

  return (
    <div
      className={`LazyLoadImage ${stateClasses}`}
      ref={wrapperRef}
    >
      <div
        className="LazyLoadImage-innerWrap"
        style={{ paddingTop: `${props.aspectRatioPercentage}%` }}
      >
        {
          displayImages
            .map(
              (img, index) => {
                const key = getImageKey(img);
                const imgProps = {...img};
                delete imgProps.loadOnScroll;
                delete imgProps.scrollMargin;
                delete imgProps.scrollThreshold;

                return (
                  <img
                    {...imgProps}
                    key={key}
                    ref={
                      imgRef => {
                        if (imgRef === null) return;                      
                        if (loadedImages.current[key]) return;
                        
                        imgRef.onload = () => {
                          loadedImages.current[key] = true;

                          // remove any unloaded images that were declared
                          // before this one
                          const imgIndex = props.images.indexOf(img);

                          if (imgIndex > -1) {
                            const prevImages =
                              props
                                .images
                                .slice(0, imgIndex);

                            if (prevImages.length) {
                              setDisplayImages(
                                displayImages
                                  .filter(dImg =>
                                    !(
                                      !loadedImages.current[getImageKey(dImg)] &&
                                      prevImages.includes(dImg)
                                    )
                                  )
                              );
                            }

                            setStateClasses(`${stateClasses} LazyLoadImage-${imgIndex}-loaded`);
                          }
                        };
                      }
                    }
                  />
                );
              }
            )
        }
      </div>  
    </div>
  );
}

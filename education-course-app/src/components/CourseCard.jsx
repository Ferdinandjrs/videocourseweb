import React from 'react';

const CourseCard = ({ image, title, description, instructorName, instructorRole, instructorAvatar, rating, reviews, price, onEdit, onDelete }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 border-light-subtle rounded-3 shadow-sm hover-elevate">
        <img src={image} className="card-img-top object-fit-cover" alt={title} style={{ height: '180px' }} />
        <div className="card-body p-3">
          <h6 className="fw-bold mb-1">{title}</h6>
          <p className="text-muted small mb-3">{description}</p>
          
          <div className="d-flex align-items-center mb-3">
            <img 
              src={instructorAvatar} 
              className="rounded-2 me-2 object-fit-cover" 
              alt={instructorName} 
              style={{ width: '35px', height: '35px' }} 
            />
            <div>
              <div className="small fw-bold" style={{ fontSize: '12px' }}>{instructorName}</div>
              <div className="text-muted" style={{ fontSize: '10px' }}>
                {instructorRole}
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="small text-warning">
              {'⭐'.repeat(Math.floor(rating))} <span className="text-muted">({reviews})</span>
            </div>
            <div className="fw-bold text-success" style={{ fontSize: '1.1rem' }}>{price}</div>
          </div>
          {(onEdit || onDelete) && (
            <div className="d-flex justify-content-end gap-2 mt-auto pt-3 border-top">
              {onEdit && <button className="btn btn-sm btn-outline-primary px-3" onClick={onEdit}>Edit</button>}
              {onDelete && <button className="btn btn-sm btn-outline-danger px-3" onClick={onDelete}>Delete</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
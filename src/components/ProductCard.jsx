import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ProductCard ({product,addProduct}){
    console.log("Product: ",product);
    const inStock = product.rating.count > 0; // Assume "count" means stock level
    const variants = ["Small", "Medium", "Large"]; // Example variants

    return (
        <div
            id={product.id}
            key={product.id}
            className="col-md-4 col-sm-6 col-12 mb-4"
            >
            <div className="card text-center h-100 shadow-sm">
                {/* Image with Out of Stock badge */}
                <div className="position-relative">
                    <img
                        className="card-img-top p-3"
                        src={product.image}
                        alt={product.title}
                        height={300}
                        style={{ objectFit: "contain" }}
                    />
                    {!inStock && (
                        <span
                            className="badge bg-danger position-absolute top-0 start-0 m-2"
                            style={{ fontSize: "0.9rem" }}
                            >
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Card body */}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={product.title}>
                        {product.title}
                    </h5>
                    <p className="card-text small text-muted">
                        {product.description.substring(0, 80)}...
                    </p>

                    <div className="d-flex flex-row justify-content-between">
                        {/* Price */}
                        <h6 className="fw-bold text-success mb-2">
                            ${product.price.toFixed(2)}
                        </h6>

                        {/* Rating */}
                        <div className="mb-2 text-warning">
                            {"★".repeat(Math.round(product.rating.rate))}
                            {"☆".repeat(5 - Math.round(product.rating.rate))}
                            <span className="text-muted small">
                            {" "}
                            ({product.rating.count} reviews)
                            </span>
                        </div>
                    </div>

                    {/* Variants */}
                    <select
                        className="form-select form-select-sm mb-3"
                        disabled={!inStock}
                    >
                        {variants.map((variant, index) => (
                        <option key={index} value={variant}>
                            {variant}
                        </option>
                        ))}
                    </select>

                    {/* Buttons */}
                    <div className="mt-auto">
                        <Link
                            to={`/product/${product.id}`}
                            className="btn btn-outline-primary btn-sm m-1"
                        >
                            View Details
                        </Link>
                        <button
                            className="btn btn-success btn-sm m-1"
                            disabled={!inStock}
                            onClick={() => {
                                toast.success("Added to cart");
                                addProduct(product);
                            }}
                        >
                        {inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
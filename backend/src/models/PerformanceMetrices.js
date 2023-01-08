// import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PerformanceMetricesSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    metricsName: {
        type: String,
        required: true
    },
    metricsTarget: {
        type: Number,
        required: true
    },
    metricsData: [
        {
            date: {
                type: String,
            },
            value: {
                type: String,

            }
        }
    ]
});
// export PerformanceMetrices model
const PerformanceMetrices = mongoose.model('PerformanceMetrices',PerformanceMetricesSchema);
module.exports = PerformanceMetrices;
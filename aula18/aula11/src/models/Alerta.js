const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
    equipamentoId: {
        type: String,
        required: [true, 'O ID do equipamento é obrigatório']
    },
    nivelSeveridade: {
        type: String,
        enum: {
            values: ['BAIXO', 'MEDIO', 'ALTO', 'CRITICO'],
            message: '{VALUE} não é um nível de severidade válido'
        },
        default: 'MEDIO'
    },
    temperaturaMedida: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    metadados: {
        type: Map,
        of: String
    },
    registradoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alerta', alertaSchema);

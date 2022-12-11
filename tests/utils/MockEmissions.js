const valid = {
  poste: 1,
  type: 'Gaz naturel - 2015, mix moyen, consommation',
  localisation: 'France continentale',
  valeur: 334,
  unite: 'GJ PCI',
  note: '',
}
const invalid = {
  noPoste: {
    type: 'Gaz naturel - 2015, mix moyen, consommation',
    localisation: 'France continentale',
    valeur: 334,
    unite: 'GJ PCI',
    note: '',
  },
  noType: {
    poste: 1,
    type: 'Gaz naturel - 2015, mix moyen, consommation',
    localisation: 'France continentale',
    valeur: 334,
    unite: 'GJ PCI',
    note: '',
  },
  noLocalisation: {
    poste: 1,
    type: 'Gaz naturel - 2015, mix moyen, consommation',
    localisation: 'France continentale',
    valeur: 334,
    unite: 'GJ PCI',
    note: '',
  },
  noValeur: {
    poste: 1,
    type: 'Gaz naturel - 2015, mix moyen, consommation',
    localisation: 'France continentale',
    valeur: 334,
    unite: 'GJ PCI',
    note: '',
  },
  incorrectValeur: {
    poste: 1,
    type: 'Gaz naturel - 2015, mix moyen, consommation',
    localisation: 'France continentale',
    valeur: 'bloup',
    unite: 'GJ PCI',
    note: '',
  },
  noUnite: {
    poste: 1,
    type: 'Gaz naturel - 2015, mix moyen, consommation',
    localisation: 'France continentale',
    valeur: 334,
    unite: 'GJ PCI',
    note: '',
  },
}

module.exports = { valid, invalid }

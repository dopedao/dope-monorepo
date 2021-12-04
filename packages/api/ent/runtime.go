// Code generated by entc, DO NOT EDIT.

package ent

import (
	"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	dopeFields := schema.Dope{}.Fields()
	_ = dopeFields
	// dopeDescClothes is the schema descriptor for clothes field.
	dopeDescClothes := dopeFields[1].Descriptor()
	// dope.ClothesValidator is a validator for the "clothes" field. It is called by the builders before save.
	dope.ClothesValidator = dopeDescClothes.Validators[0].(func(string) error)
	// dopeDescFoot is the schema descriptor for foot field.
	dopeDescFoot := dopeFields[2].Descriptor()
	// dope.FootValidator is a validator for the "foot" field. It is called by the builders before save.
	dope.FootValidator = dopeDescFoot.Validators[0].(func(string) error)
	// dopeDescHand is the schema descriptor for hand field.
	dopeDescHand := dopeFields[3].Descriptor()
	// dope.HandValidator is a validator for the "hand" field. It is called by the builders before save.
	dope.HandValidator = dopeDescHand.Validators[0].(func(string) error)
	// dopeDescNeck is the schema descriptor for neck field.
	dopeDescNeck := dopeFields[4].Descriptor()
	// dope.NeckValidator is a validator for the "neck" field. It is called by the builders before save.
	dope.NeckValidator = dopeDescNeck.Validators[0].(func(string) error)
	// dopeDescRing is the schema descriptor for ring field.
	dopeDescRing := dopeFields[5].Descriptor()
	// dope.RingValidator is a validator for the "ring" field. It is called by the builders before save.
	dope.RingValidator = dopeDescRing.Validators[0].(func(string) error)
	// dopeDescWaist is the schema descriptor for waist field.
	dopeDescWaist := dopeFields[6].Descriptor()
	// dope.WaistValidator is a validator for the "waist" field. It is called by the builders before save.
	dope.WaistValidator = dopeDescWaist.Validators[0].(func(string) error)
	// dopeDescWeapon is the schema descriptor for weapon field.
	dopeDescWeapon := dopeFields[7].Descriptor()
	// dope.WeaponValidator is a validator for the "weapon" field. It is called by the builders before save.
	dope.WeaponValidator = dopeDescWeapon.Validators[0].(func(string) error)
	// dopeDescDrugs is the schema descriptor for drugs field.
	dopeDescDrugs := dopeFields[8].Descriptor()
	// dope.DrugsValidator is a validator for the "drugs" field. It is called by the builders before save.
	dope.DrugsValidator = dopeDescDrugs.Validators[0].(func(string) error)
	// dopeDescVehicle is the schema descriptor for vehicle field.
	dopeDescVehicle := dopeFields[9].Descriptor()
	// dope.VehicleValidator is a validator for the "vehicle" field. It is called by the builders before save.
	dope.VehicleValidator = dopeDescVehicle.Validators[0].(func(string) error)
}

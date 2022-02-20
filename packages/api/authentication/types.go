package authentication

type LoginBody struct {
	Message   string `json:"message"`
	Signature string `json:"signature"`
}

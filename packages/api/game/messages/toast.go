package messages

type ToastStatus string

// translates to a Toast() in the client
type Toast struct {
	Status  ToastStatus `json:"status"`
	Message string      `json:"message"`
}

const (
	SUCCESS ToastStatus = "success"
	INFO    ToastStatus = "info"
	ERROR   ToastStatus = "error"
	WARNING ToastStatus = "warning"
)

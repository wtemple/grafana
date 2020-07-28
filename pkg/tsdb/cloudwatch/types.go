package cloudwatch

import (
	"fmt"

	"github.com/grafana/grafana/pkg/tsdb"
)

type requestQuery struct {
	RefId              string
	Region             string
	Id                 string
	Namespace          string
	MetricName         string
	Statistics         []*string
	QueryType          string
	Expression         string
	ReturnData         bool
	Dimensions         map[string][]string
	ExtendedStatistics []*string
	Period             int
	Alias              string
	MatchExact         bool
}

type cloudwatchResponse struct {
	series                  *tsdb.TimeSeriesSlice
	Id                      string
	RefId                   string
	Expression              string
	RequestExceededMaxLimit bool
	PartialData             bool
	Period                  int
}

type queryError struct {
	err   error
	RefID string
}

func (e *queryError) Error() string {
	return fmt.Sprintf("error parsing query %q, %s", e.RefID, e.err)
}

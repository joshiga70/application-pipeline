Feature: Monitoring page Validation

    Validate CRUD operations on Monitoring kubernetes cluster

    Scenario Outline: <Test> Check if monitoring page is accessible or not
        Given Navigate to Monitoring page
        Then Check title on monitoring page
        Then Check button on monitoring page
        Examples:
            | Test |
            | 1    |

    Scenario Outline: <Test> Check if URL is accessible with 200 status code
        Given Navigate to Monitoring page
        Then Check the URL of monitoring page
        Examples:
            | Test |
            | 2    |

    Scenario Outline: <Test> Click the button to navigate to cluster status page
        Given Navigate to Monitoring page
        When Click on pod status button
        Then Check the URL of status page
        Then Check the cluster details on status page
        Examples:
            | Test |
            | 3    |
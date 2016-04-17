/**
 * Created by Nicolas on 9/22/15.
 */
import App from 'app';
import React from 'react';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amount: null};
    }

    amountDidChange(e) {
        this.setState({
            amount: e.target.value
        });
    }

    donateDidClick() {
        var amount = parseFloat(this.state.amount) * 100;
        amount = amount || 500;

        if (!this.stripeHandler) {
            this.stripeHandler = StripeCheckout.configure({
                key       : 'pk_live_AcfQs725nv7nIF5sRCG3v4Q8',
                image     : 'https://s3.amazonaws.com/stripe-uploads/acct_16mDSJB8UmE70jk7merchant-icon-1442539384457-ava-mdpi.jpg',
                locale    : 'auto',
                panelLabel: 'Donate {{amount}}',
                email     : App.user.email,
                bitcoin   : true,
                token     : function (token) {
                    // Use the token to create the charge with a server-side script.
                    // You can access the token ID with `token.id`
                    // NOOP
                }
            });
        }

        this.stripeHandler.open({
            name       : 'Nicolas Siver',
            description: 'NS Twitch Monitor Donation',
            amount     : amount
        });
    }

    render() {
        return (
            <div>
                <p>Do you like the plugin? Motivate developer, make a donation. Thank you.</p>

                <div className="row">
                    <div className="col-md-6">
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_s-xclick"/>
                            <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"/>
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Amount"
                                value={this.state.amount}
                                onChange={this.amountDidChange.bind(this)}/>
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={this.donateDidClick.bind(this)}>Donate via Stripe
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

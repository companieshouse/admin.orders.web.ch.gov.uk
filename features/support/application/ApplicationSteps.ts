import "reflect-metadata";
import {binding, given} from "cucumber-tsflow/dist";
import {FEATURE_FLAGS} from "../../../dist/config/FeatureOptions";

@binding()
export class ApplicationSteps {

    @given(/Multi-item basket functionality has been enabled/)
    public multiItemBasketEnabled() {
        FEATURE_FLAGS.multiItemBasketEnabled = true;
    }
}

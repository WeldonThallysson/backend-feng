import { Injectable} from "@nestjs/common"
import { PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy} from 'passport-jwt'

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:"MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAdygNkrnOqyk58nYD2SYlGakyPgUa",
        })
    }

    async validate(payload: {sub: string, email: string}){
        return {userId: payload.sub, email: payload.email}
    }
}
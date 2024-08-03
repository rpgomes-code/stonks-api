import { 
    IsBoolean,
    IsNotEmpty, 
    IsString 
} from "class-validator";

export class CreateApplicationDto {
    @IsString()
    @IsNotEmpty()
    appSlug: string;
}

export class UpdateApplicationDto {
    @IsString()
    @IsNotEmpty()
    appSlug: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}